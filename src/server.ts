/*
 **********************************************
 **All nessary modules import start from here**
 **********************************************
 */
import { unmarshall } from '@aws-sdk/util-dynamodb';
import cors from '@koa/cors';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import config from './config';
import router from './routes';
import { IResponseSyntex } from './types/globalTypes';
/*
 **********************************************
 **All nessary module modules import end here**
 **********************************************
 */

//New object created form Koa
const app = new Koa();

app.context.sendResponse = function (response: IResponseSyntex) {
  const { body, code, message, status, key } = response;
  this.status = code;
  if (body) {
    if (Array.isArray(body)) {
      if (key) {
        this.body = {
          code,
          message,
          status,
          [key]: body.map((item) => unmarshall(item))
        };
      } else {
        this.body = {
          code,
          message,
          status,
          body: body.map((item) => unmarshall(item))
        };
      }
    } else {
      if (key) {
        this.body = {
          code,
          message,
          status,
          [key]: unmarshall(body)
        };
      } else {
        this.body = {
          code,
          message,
          status,
          body: unmarshall(body)
        };
      }
    }
  } else {
    this.body = {
      code,
      message,
      status
    };
  }
};

app.context.connection = config.connection;

/************************************
 ** all middle ware start form here**
 ************************************/

//body parser
app.use(cors());
app.use(bodyparser());
//route middleware
app.use(router());

/************************************
 ** all middle ware end here**
 ************************************/

//server start
export default app.listen(config.PORT, () =>
  console.log(`Server is running http://localhost:${config.PORT}`)
);
