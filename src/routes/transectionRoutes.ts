import Router from "koa-router";
import TransectionController from "../controllers/TransactionController";

const transactionRoutes = new Router({
  prefix: "/tx", //This will apply for wall transaction route ex: /tx/something
});

//New instance from walletcontroller
const transaction = new TransectionController();

//all routes
transactionRoutes.get("/", transaction.getAll);
transactionRoutes.post("/", transaction.store);

export default transactionRoutes;
