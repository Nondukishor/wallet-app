import {
  ScanCommand,
  GetItemCommand,
  BatchWriteItemCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import {
  BatchWriteCommandInput,
  BatchWriteCommandOutput,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Context } from "koa";

export default class TransectionController {
  tableName: string;
  constructor() {
    this.tableName = "wallets";
  }
  /**
   * This is a member function of transaction controller
   * This function will return a array object of transaction
   * @param ctx
   * @returns Promise
   **/
  async getAll(ctx: Context): Promise<void> {
    try {
      const params: ScanCommandInput = {
        TableName: this.tableName,
      };
      const command: ScanCommand = new ScanCommand(params);

      const results: ScanCommandOutput = await ctx.connection.send(command);

      if (results) {
        const transactionsData = results.Items.map((item) => unmarshall(item));
        ctx.body = transactionsData;
      }
    } catch (error: any) {
      ctx.body = error;
    }
  }

  /**
   * This is a member function of transaction controller
   * This function will return a object of transaction after store a object in database
   * @param ctx
   * @returns Promise
   **/
  async store(ctx: Context): Promise<void> {
    try {
      const body: any = ctx.request.body;
      const params1 = {
        TableName: "wallets",
        Key: {
          id: { S: body.from },
        },
      };

      const params2 = {
        TableName: "wallets",
        Key: {
          id: { S: body.to },
        },
      };

      const fromData = await ctx.connection.send(new GetItemCommand(params1));

      const toData = await ctx.connection.send(new GetItemCommand(params2));

      const parseFromData = unmarshall(fromData.Item, {
        wrapNumbers: true,
      });
      const parseToData = unmarshall(toData.Item);

      if (body && parseFromData?.balance) {
        if (parseFromData.balance >= body?.amount) {
          const mainBalance: string = parseFromData?.balance;

          const netBalance: number = parseFloat(mainBalance) - parseFloat(body?.amount);
          const exsitingBalance: number = parseToData?.balance
            ? parseFloat(parseToData.balance)
            : 0;
          const amount = parseFloat(body.amount).toFixed(2);

          console.log(parseFromData.todayBalanceChange);

          const params: BatchWriteCommandInput = {
            RequestItems: {
              wallets: [
                {
                  PutRequest: {
                    Item: marshall({
                      ...parseFromData,
                      balance: netBalance.toFixed(2),
                      todayBalanceChange: Array.isArray(parseFromData?.todayBalanceChange)
                        ? parseFromData?.todayBalanceChange?.push(amount || 0)
                        : [amount],
                    }),
                  },
                },
                {
                  PutRequest: {
                    Item: marshall({
                      ...parseToData,
                      balance: parseFloat(exsitingBalance + amount).toFixed(2),
                      todayBalanceChange: Array.isArray(parseToData?.todayBalanceChange)
                        ? parseToData?.todayBalanceChange?.push(amount || 0)
                        : [amount],
                    }),
                  },
                },
              ],
            },
          };

          const command: BatchWriteItemCommand = new BatchWriteItemCommand(params);

          const result: BatchWriteCommandOutput = await ctx.connection.send(command);

          ctx.body = result;
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }
}
