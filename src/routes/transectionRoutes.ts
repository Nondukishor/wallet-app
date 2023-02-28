import Router from 'koa-router';
import TransactionController from '../controllers/TransactionController';

const transactionRoutes = new Router({
  prefix: '/tx' //This will apply for wall transaction route ex: /tx/something
});

//New instance from TransactionController
const transaction = new TransactionController();

//all routes
transactionRoutes.get('/', transaction.getAll);
transactionRoutes.post('/', transaction.transfer);
transactionRoutes.get('/today', transaction.todaysTransaction);

export default transactionRoutes;
