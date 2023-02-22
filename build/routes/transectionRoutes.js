"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const transactionRoutes = new koa_router_1.default({
    prefix: "/tx" //This will apply for wall transaction route ex: /tx/something
});
//New instance from walletcontroller
const transaction = new transactionController_1.default();
//all routes
transactionRoutes.get("/", transaction.getAll);
transactionRoutes.post("/", transaction.store);
exports.default = transactionRoutes;
