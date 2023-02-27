import combineRouters from "../utils/combineRoutes";
import dynamodb from "./tableRoutes";
import transactionRoutes from "./transectionRoutes";
import walletRoutes from "./walletRoutes";
import Router from "koa-router";
const router = new Router();

const routers = combineRouters([router, walletRoutes, dynamodb, transactionRoutes]);

export default routers;
