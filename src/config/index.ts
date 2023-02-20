import dotenv from 'dotenv'
import path from 'path'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IConfig } from './types';


dotenv.config({
  path:`${path.resolve(__dirname, '../../.env.development')}`
});

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};


export const client = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.DYNAMODB_REGION,
  credentials:{
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
})

export const ddbDocClient = DynamoDBDocumentClient.from(client,{
  marshallOptions,
  unmarshallOptions
})



const config:IConfig = {
  PORT: process.env.PORT || 4000,
  connection: ddbDocClient
}

//config object freeze so that nobody can change it.

Object.freeze(config)

export default config