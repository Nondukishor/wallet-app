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
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const config_1 = require("../../config");
class WalletController {
    /**
     * This is a member function of wallet controller
     * This function will return a array object of wallet
     * @param ctx
     * @returns Promise
     **/
    getAll(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    "TableName": "wallets",
                };
                const results = yield config_1.client.send(new client_dynamodb_1.ScanCommand(params));
                ctx.body = results.Items;
            }
            catch (error) {
                console.log(error);
                ctx.body = error;
            }
        });
    }
    /**
     * This is a member function of wallet controller
     * This function will return a object of wallet find by wallet ID
     * @param ctx
     * @returns Promise
     **/
    getById(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.params;
            ctx.body = id;
        });
    }
    /**
     * This is a member function of wallet controller
     * This function will return a object of wallet after store a object in database
     * @param ctx
     * @returns Promise
     **/
    store(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "TableName": "transection",
                "Item": {
                    "id": { "N": "12" },
                    "name": { "S": "Nipu" },
                    "changebalance": { "N": "12" }
                }
            };
            const body = ctx.request.body;
            ctx.body = body;
        });
    }
    /**
     * This is a member function of wallet controller
     * This function will return a object of wallet after delte a object from database
     * @param ctx
     * @returns Promise
     **/
    destory(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.params;
            ctx.body = "store function";
        });
    }
    /**
     * This is a member function of wallet controller
     * This function will return a object of wallet after update a object in database
     * @param ctx
     * @returns Promise
     **/
    update(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.params;
            ctx.body = "store function";
        });
    }
}
exports.default = WalletController;
