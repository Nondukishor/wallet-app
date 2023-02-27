import {
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommandOutput,
  DeleteItemCommand,
  ScanCommand,
  GetItemCommandInput,
  ScanCommandInput,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
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

      if (results) {
        ctx.status = 200;
        ctx.message = "Fetch successfully";
        ctx.sendResponse({
          message: "Fetch successfully",
          code: 200,
          body: results.Items,
          key: "wallets",
          status: "success",
        });
      }
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
      const { id, name } = ctx.params;

      const params: GetItemCommandInput = {
        TableName: "wallets",
        Key: marshall({
          id: id,
          name: name,
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
      const params: PutItemCommandInput = {
        TableName: "wallets",
        Item: marshall({
          id: uuidv4(),
          name: body.name,
          currency: body.currency,
          balance: body.initialBalance,
          todayBalanceChange: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      };

      const created = await ctx.connection.send(new PutItemCommand(params));

      if (created)
        ctx.sendResponse({
          message: "Created successfully",
          status: "success",
          code: 201,
          body: created.Attributes || {},
          key: "wallet",
        });
    } catch (error: unknown) {
      console.log(error);
      ctx.sendResponse({
        message: "Ocurred Error",
        code: ctx.status || 500,
        status: "error",
      });
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after delte a object from database
   * @param ctx
   * @returns Promise
   **/
  async destory(ctx: Context) {
    try {
      const { id, name } = ctx.params;
      const params = {
        TableName: "wallets",
        Key: marshall({
          id: id,
          name: name,
        }),
      };

      const command = new DeleteItemCommand(params);

      const deleted = await ctx.connection.send(command);

      if (deleted) {
        ctx.sendResponse({
          message: "Deleted successfully",
          code: deleted.$metadata.httpStatusCode || 202,
          body: {},
          key: "data",
        });
      } else {
        throw new Error("Item cannot deleted successfully");
      }
    } catch (error: any) {
      console.log(error);
      ctx.sendResponse({
        message: error.message || "Occured a error",
        code: ctx.status || 500,
        body: error,
        key: "error",
      });
    }
  }

  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after update a object in database
   * @param ctx
   * @returns Promise
   **/
  async update(ctx: Context) {
    const { id, name } = ctx.params;
    const body: any = ctx.request.body;

    const params = {
      TableName: "wallets",
      Key: marshall({
        id: id,
        name: name,
      }),
      UpdateExpression:
        "SET #name = :name, #balance = :balance, #todayBalanceChange = :todayBalanceChange, #updatedAt = :updatedAt",
      ExpressionAttributeValues: marshall({
        ":name": body.name,
        ":balance": body.balance,
        ":todayBalanceChange": body.todayBalanceChange,
        ":updatedAt": new Date().toISOString(),
      }),
      ExpressionAttributeNames: {
        "#name": "name",
        "#balance": "balance",
        "#todayBalanceChange": "todayBalanceChange",
        "#updatedAt": "updatedAt",
      },

      ReturnValues: "UPDATED_NEW",
    };

    try {
      const command = new UpdateItemCommand(params);

      const result = await ctx.connection.send(command);

      ctx.sendResponse({
        message: "Updated successfully",
        code: result.$metadata.httpStatusCode,
        body: result.Attributes,
        key: "wallet",
      });
    } catch (error: any) {
      ctx.sendResponse({
        message: "Updated successfully",
        code: error.message,
        body: error,
        key: "error",
      });
    }
  }
}
