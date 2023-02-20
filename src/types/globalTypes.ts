import {Context, Next } from "koa";
import {AttributeValue} from '@aws-sdk/client-dynamodb'
import {DynamoDBDocumentClient} from '@aws-sdk/lib-dynamodb'


export interface IResponseSyntex {
    code?: number;
    message: string,
    data?: any,
    status: "success" | "error" | "unknown"
}

export interface CustomContext extends Context{
   sendResponse:(statusCode: number, data: any) => void;
   connection: DynamoDBDocumentClient;
   state:{
    parseResponse?: (item: { [key: string]: AttributeValue } | undefined)=>any,
   }
}

