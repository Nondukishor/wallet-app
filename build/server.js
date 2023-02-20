"use strict";
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
//router middleware
app.use((0, koa_bodyparser_1.default)());
app.use(config_1.default.database);
app.use((0, routes_1.default)());
//server start
app.listen(config_1.default.PORT, () => {
    console.log(`serve is running on port ${config_1.default.PORT} `);
});
