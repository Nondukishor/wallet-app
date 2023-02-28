import { Context } from 'koa';
import Router from 'koa-router';
import combineRouters from '../utils/combineRoutes';
import dynamodb from './tableRoutes';
import transactionRoutes from './transectionRoutes';
import walletRoutes from './walletRoutes';
const router = new Router();
router.get('/', (ctx: Context) => {
  ctx.body = {
    message: 'Server is healthy and running successfully'
  };
});
const routers = combineRouters([router, walletRoutes, dynamodb, transactionRoutes]);

export default routers;
