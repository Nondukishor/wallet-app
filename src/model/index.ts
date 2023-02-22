import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export class Model {
  constructor(
    private readonly client: DynamoDBDocumentClient,
    protected tableName: string
  ) {}

  async create(item: any) {
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    const command = new PutItemCommand(params);
    return await this.client.send(command);
  }

  async findById(id: string) {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id,
      }),
    };
    const command = new GetItemCommand(params);
    const result = await this.client.send(command);
    return unmarshall(result.Item);
  }

  async update(id: string, updatedItem: any, updateExpression: string[]) {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id,
      }),
      UpdateExpression: `set #name = :name, #age = :age, #email = :email`,
      ExpressionAttributeNames: {
        "#name": "name",
        "#age": "age",
        "#email": "email",
      },
      ExpressionAttributeValues: {
        ":name": updatedItem.name,
        ":age": updatedItem.age,
        ":email": updatedItem.email,
      },
      ReturnValues: "ALL_NEW",
    };
    const command = new UpdateItemCommand(params);
    const result = await this.client.send(command);
    return result.Attributes;
  }

  async deleteItem(id: string) {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id,
      }),
    };

    const command = new DeleteItemCommand(params);
    const result = await this.client.send(command);

    return result;
  }
}

export default Model;
