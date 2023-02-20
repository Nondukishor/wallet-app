import { Context } from "koa";
import IBaseController  from "./dto/IBaseController";

export default class BaseController implements IBaseController{
    model:any
    constructor(model:any){
     this.model=model   
    }
    getAll(ctx: Context): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(ctx: Context): Promise<void> {
        throw new Error("Method not implemented.");
    }
    store(ctx: Context): Promise<void> {
        throw new Error("Method not implemented.");
    }
    destory(ctx: Context): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(ctx: Context): Promise<void> {
        throw new Error("Method not implemented.");
    }
   
  
}