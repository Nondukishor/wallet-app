/*
 **********************************************
 **All nessary modules import start from here**
 **********************************************
 */
import Koa from "koa";
import bodyparser from "koa-bodyparser";
import router from "./routes";
import config from "./config";
import { CustomContext } from "./types/globalTypes";
/*
 **********************************************
 **All nessary module modules import end here**
 **********************************************
 */






  //New object created form Koa
  const app = new Koa<CustomContext>();

  /**
   * @param statusCode 
   * @param data 
   */
  app.context.sendResponse = function(statusCode: number, data: any) {
    this.status = statusCode;
    this.body = data;
  };

  app.context.connection = config.connection

  /************************************
   ** all middle ware start form here**
   ************************************/

  //body parser
  app.use(bodyparser());

  //route middleware
  app.use(router());

  /************************************
   ** all middle ware end here**
   ************************************/


  //server start
  app.listen(config.PORT, async() => {
    console.log(`server is running on port http://localhost:${config.PORT} `);
  });

  