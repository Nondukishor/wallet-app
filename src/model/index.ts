import {
  AttributeValue,
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import config from "../config";
import {
  convertToExpressionAttributeNames,
  convertToExpressionAttributeValues,
  convertToExpressionUpdateExpression,
  pluralize,
} from "../utils";

export class Model {
  private tableName: string;
  private client: DynamoDBDocumentClient;
  constructor() {
    this.tableName = pluralize(this.constructor.name);
    this.client = config.connection;
    this.getTableName = this.getTableName.bind(this);
  }

  public getTableName = (): string => {
    return this.tableName;
  };

  public setTableName = (tableName: string) => {
    return (this.tableName = tableName);
  };

  find = async (): Promise<Record<string, AttributeValue>[] | any> => {
    try {
      const params: ScanCommandInput = {
        TableName: this.tableName,
      };
      const command: ScanCommand = new ScanCommand(params);
      const result: ScanCommandOutput = await this.client.send(command);
      return result.Items.map((item) => unmarshall(item));
    } catch (error: any) {
      return error;
    }
  };

  findById = async (id: string): Promise<Record<string, AttributeValue>> => {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id,
      }),
    };
    const command = new GetItemCommand(params);
    const result = await this.client.send(command);
    return unmarshall(result.Item);
  };

  create = async (item: any) => {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    const command = new PutItemCommand(params);
    return await this.client.send(command);
  };

  update = async (id: string, updatedvalue: Record<string, any>) => {
    const keys = Object.keys(updatedvalue);
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id,
      }),
      UpdateExpression: convertToExpressionUpdateExpression(keys),
      ExpressionAttributeNames: convertToExpressionAttributeNames(keys),
      ExpressionAttributeValues: convertToExpressionAttributeValues(updatedvalue),
      ReturnValues: "ALL_NEW",
    };
    const command = new UpdateItemCommand(params);
    const result = await this.client.send(command);
    return result.Attributes;
  };

  deleteItem = async (id: string) => {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id,
      }),
    };

    const command = new DeleteItemCommand(params);
    const result = await this.client.send(command);

    return result;
  };
}

export default Model;
