"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const walletController_1 = __importDefault(require("../controllers/walletController"));
const walletRoutes = new koa_router_1.default({
    prefix: "/wallets" //This will apply for wall wallet route ex: /wallets/something
});
//New instance from walletcontroller
const wallets = new walletController_1.default();
//all routes
walletRoutes.get("/", wallets.getAll);
walletRoutes.get("/:id", wallets.getById);
walletRoutes.post("/", wallets.store);
walletRoutes.patch("/:id", wallets.update);
walletRoutes.delete("/:id", wallets.destory);
exports.default = walletRoutes;
