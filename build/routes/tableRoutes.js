"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const dbOperationController_1 = __importDefault(require("../controllers/dbOperationController"));
const dynamodb = new koa_router_1.default({
    prefix: "/db" //This will apply for wall wallet route ex: /wallets/something
});
//New instance from walletcontroller
const transactionRoutes = new dbOperationController_1.default();
//all routes
dynamodb.get("/table/delete/:name", transactionRoutes.deleteTable);
dynamodb.get("/table/delete/data/:name", transactionRoutes.deleteAllData);
exports.default = dynamodb;
