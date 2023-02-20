/*
 **********************************************
 **All nessary modules import start from here**
 **********************************************
 */
import Koa, { Next } from "koa";
import bodyparser from "koa-bodyparser";
import router from "./routes";
import config from "./config";
import { CustomContext, IResponseSyntex } from "./types/globalTypes";
/*
 **********************************************
 **All nessary module modules import end here**
 **********************************************
 */


  //New object created form Koa
  const app = new Koa();

  /************************************
   ** all middle ware start form here**
   ************************************/

  //body parser
  app.use(bodyparser());




  //context customize
  app.use(async (ctx: CustomContext, next: Next) => {

    //api response 
    ctx.apiResponse = (param: IResponseSyntex) => {
      ctx.status = param.code ? param.code : 200;
      ctx.body= param
      return ctx.body;
    };

    //db connection 
    ctx.state.dynamodb = config.connection
    await next();
  });



  app.use(router());

  /************************************
   ** all middle ware end here**
   ************************************/


  //server start
  app.listen(config.PORT, async() => {
    console.log(`server is running on port http://localhost:${config.PORT} `);
  });

  