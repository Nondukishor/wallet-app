"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 **********************************************
 **All nessary modules import start from here**
 **********************************************
 */
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
/*
 **********************************************
 **All nessary module modules import end here**
 **********************************************
 */
//New object created form Koa
const app = new koa_1.default();
/**
 * @param statusCode
 * @param data
 */
app.context.sendResponse = function (statusCode, data) {
    this.status = statusCode;
    this.body = data;
};
app.context.connection = config_1.default.connection;
/************************************
 ** all middle ware start form here**
 ************************************/
//body parser
app.use((0, koa_bodyparser_1.default)());
//route middleware
app.use((0, routes_1.default)());
/************************************
 ** all middle ware end here**
 ************************************/
//server start
app.listen(config_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server is running on port http://localhost:${config_1.default.PORT} `);
}));
