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
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const responseParser_1 = require("../../utils/responseParser");
const uuid_1 = require("uuid");
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
                    TableName: "wallets",
                };
                const command = new client_dynamodb_1.ScanCommand(params);
                const results = yield ctx.connection.send(command);
                if (results)
                    ctx.status = 200;
                ctx.message = "Fetch successfully";
                ctx.body = {
                    wallets: results === null || results === void 0 ? void 0 : results.Items.map(item => (0, util_dynamodb_1.unmarshall)(item))
                };
            }
            catch (error) {
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
            try {
                const { id } = ctx.params;
                const params = {
                    TableName: "wallets",
                    Key: {
                        id: { S: id },
                    },
                };
                const command = new client_dynamodb_1.GetItemCommand(params);
                const result = yield ctx.connection.send(command);
                const wallet = (0, responseParser_1.convertDynamoDBFormat)(result.Item);
                ctx.body = wallet;
            }
            catch (error) {
                ctx.body = error;
            }
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
            try {
                const body = ctx.request.body;
                const params = {
                    TableName: "wallets",
                    Item: (0, util_dynamodb_1.marshall)({
                        id: (0, uuid_1.v4)(),
                        name: body.name,
                        currency: body.currency,
                        balance: body.initialBalance,
                        todayBalanceChange: [],
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    }),
                };
                const created = yield ctx.connection.send(new client_dynamodb_1.PutItemCommand(params));
                if (created)
                    ctx.body = {
                        message: "Created successfully",
                        status: "success",
                        code: 201,
                    };
            }
            catch (error) {
                ctx.body = {
                    message: "Ocurred Error",
                    status: "error",
                    code: 500,
                };
            }
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
            const params = {
                TableName: "wallets",
                Key: (0, util_dynamodb_1.marshall)({ id: id }),
            };
            const command = new client_dynamodb_1.DeleteItemCommand(params);
            const result = yield ctx.connection.send(command);
            ctx.body = result;
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
            ctx.body = "";
        });
    }
}
exports.default = WalletController;
