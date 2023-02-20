import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export interface IConfig{
    PORT: number | string,
    connection: DynamoDBDocumentClient
}