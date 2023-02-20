import { CustomContext } from "../../types/globalTypes";
import {
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { convertDynamoDBFormat } from "../../utils/responseParser";
import { v4 as uuidv4 } from "uuid";
import { ScanCommandInput } from "@aws-sdk/client-dynamodb";

export default class WalletController {
  /**
   * This is a member function of wallet controller
   * This function will return a array object of wallet
   * @param ctx
   * @returns Promise
   **/
  async getAll(ctx: CustomContext): Promise<void> {
    try {
      const params: ScanCommandInput = {
        TableName: "wallets",
      };
      const command = new ScanCommand(params);
      const results = await ctx.state.dynamodb.send(command);

      console.log(results);

      if (results) ctx.status = 200;
      ctx.message = "Fetch successfully";
      ctx.body = {
        wallets: results?.Items?.map(convertDynamoDBFormat)
          .sort((a, b) => b.createAt - a.createAt)
          .reverse(),
      };
    } catch (error: any) {
      ctx.body = error;
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet find by wallet ID
   * @param ctx
   * @returns Promise
   **/
  async getById(ctx: CustomContext): Promise<void> {
    try {
      const { id } = ctx.params;
      const params = {
        TableName: "wallets",
        Key: {
          id: { S: id },
        },
      };
      const command = new GetItemCommand(params);
      const result = await ctx.state.dynamodb.send(command);
      const wallet = convertDynamoDBFormat(result.Item);
      ctx.body = wallet;
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after store a object in database
   * @param ctx
   * @returns Promise
   **/
  async store(ctx: CustomContext): Promise<void> {
    try {
      const body: any = ctx.request.body;
      const params: PutItemCommandInput = {
        TableName: "wallets",
        Item: marshall({
          id: uuidv4(),
          name: body.name,
          currency: body.currency,
          balance: body.initialBalance,
          todayBalanceChange: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }),
      };

      const created = await ctx.state.dynamodb.send(new PutItemCommand(params));
      if (created)
        ctx.apiResponse({
          message: "Created successfully",
          status: "success",
          code: 201,
        });
    } catch (error: unknown) {
      ctx.apiResponse({
        message: "Ocurred Error",
        status: "error",
        code: 500,
      });
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after delte a object from database
   * @param ctx
   * @returns Promise
   **/
  async destory(ctx: CustomContext): Promise<void> {
    const { id } = ctx.params;
    const params = {
      TableName: "wallets",
      Key: marshall({ id: id }),
    };
    const command = new DeleteItemCommand(params);
    const result = await ctx.state.dynamodb.send(command);
    ctx.body = result;
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after update a object in database
   * @param ctx
   * @returns Promise
   **/
  async update(ctx: CustomContext): Promise<void> {
    const { id } = ctx.params;
    ctx.body = "";
  }
}
