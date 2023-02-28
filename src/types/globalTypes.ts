import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
// import { BaseContext } from 'koa';

/**
 * @param response param for response.
 * @param response.message message for response.
 * @param response.code status code for api response.
 * @param response.body response data
 * @param response.status response status hint "error, success, warn, uknown"
 * @param key response data key if you want to change unless it will show the default boy key for response
 **/
export interface IResponseSyntex {
  code: number;
  message: string;
  body?: any;
  key?: string;
  status?: 'success' | 'error' | 'warn' | 'unkown';
}

declare module 'koa' {
  export default interface BaseContext {
    sendResponse: (response: IResponseSyntex) => void;
    connection: DynamoDBDocumentClient;
  }
}
