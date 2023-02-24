import {
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommandOutput,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { Context } from "koa";

export default class WalletController {
  /**
   * This is a member function of wallet controller
   * This function will return a array object of wallet
   * @param ctx
   * @returns Promise
   **/
  async getAll(ctx: Context) {
    try {
      const params: ScanCommandInput = {
        TableName: "wallets",
      };
      const command: ScanCommand = new ScanCommand(params);

      const results: ScanCommandOutput = await ctx.connection.send(command);

      if (results) ctx.status = 200;
      ctx.message = "Fetch successfully";
      ctx.sendResponse({
        message: "Fetch successfully",
        code: 200,
        body: results.Items,
        key: "wallets",
        status: "success",
      });
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
  async getById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const params = {
        TableName: "wallets",
        Key: marshall({
          id: { S: id },
        }),
      };

      const command = new GetItemCommand(params);
      const result = await ctx.connection.send(command);
      if (!result.Item) {
        ctx.throw(404);
      }
      ctx.sendResponse({
        message: "Get item successfully",
        code: 200,
        status: "success",
        body: result.Item,
        key: "wallet",
      });
    } catch (error) {
      ctx.sendResponse({
        code: ctx.status,
        message: ctx.message,
        status: "error",
      });
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after store a object in database
   * @param ctx
   * @returns Promise
   **/
  async store(ctx: Context) {
    try {
      const body: any = ctx.request.body;

      console.log(
        marshall({
          id: uuidv4(),
          name: body.name,
          currency: body.currency,
          balance: body.initialBalance,
          todayBalanceChange: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      );
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

      const created = await ctx.connection.send(new PutItemCommand(params));

      if (created)
        ctx.body = {
          message: "Created successfully",
          status: "success",
          code: 201,
        };
    } catch (error: unknown) {
      console.log(error);
      ctx.body = {
        message: "Ocurred Error",
        status: "error",
        code: 500,
      };
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after delte a object from database
   * @param ctx
   * @returns Promise
   **/
  async destory(ctx: Context) {
    const { id } = ctx.params;
    const params = {
      TableName: "wallets",
      Key: marshall({ id: id }),
    };
    const command = new DeleteItemCommand(params);
    const result = await ctx.connection.send(command);
    ctx.body = result;
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after update a object in database
   * @param ctx
   * @returns Promise
   **/
  async update(ctx: Context) {
    const { id } = ctx.params;
    ctx.body = "";
  }
}
