import Router from 'koa-router';
import TableOperationController from '../controllers/dbOperationController';



const dynamodb = new Router({
    prefix: "/db" //This will apply for wall wallet route ex: /wallets/something
});

//New instance from walletcontroller
const transactionRoutes = new TableOperationController();

//all routes
dynamodb.get("/table/delete/:name", transactionRoutes.deleteTable)
dynamodb.get("/table/delete/data/:name", transactionRoutes.deleteAllData)


export default dynamodb

