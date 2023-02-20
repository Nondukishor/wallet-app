import Router from 'koa-router';
import WalletController from '../controllers/walletController';


const walletRoutes = new Router({
    prefix: "/wallets" //This will apply for wall wallet route ex: /wallets/something
});

//New instance from walletcontroller
const wallets = new WalletController();

//all routes
walletRoutes.get("/", wallets.getAll)

walletRoutes.get("/:id", wallets.getById)

walletRoutes.post("/", wallets.store)

walletRoutes.patch("/:id", wallets.update)

walletRoutes.delete("/:id", wallets.destory)


export default walletRoutes

