import { Context } from 'koa';
export default interface IBaseController {
  /**
   * This is a member function of wallet controller
   * This function will return a array object of wallet
   * @param ctx
   * @returns Promise
   **/
  getAll(ctx: Context): Promise<void>;
  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet find by wallet ID
   * @param ctx
   * @returns Promise
   **/
  getById(ctx: Context): Promise<void>;
  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after store a object in database
   * @param ctx
   * @returns Promise
   **/
  store(ctx: Context): Promise<void>;
  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after delte a object from database
   * @param ctx
   * @returns Promise
   **/
  destory(ctx: Context): Promise<void>;
  /**
   * This is a member function of wallet controller
   * This function will return a object of wallet after update a object in database
   * @param ctx
   * @returns Promise
   **/
  update(ctx: Context): Promise<void>;
}
