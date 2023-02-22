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
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class TransectionController {
    constructor() {
        this.tableName = "wallets";
    }
    /**
     * This is a member function of transaction controller
     * This function will return a array object of transaction
     * @param ctx
     * @returns Promise
     **/
    getAll(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    "TableName": this.tableName
                };
                const command = new client_dynamodb_1.ScanCommand(params);
                const results = yield ctx.connection.send(command);
                if (results) {
                    const transactionsData = results.Items.map((item) => (0, util_dynamodb_1.unmarshall)(item));
                    ctx.body = transactionsData;
                }
            }
            catch (error) {
                ctx.body = error;
            }
        });
    }
    /**
     * This is a member function of transaction controller
     * This function will return a object of transaction after store a object in database
     * @param ctx
     * @returns Promise
     **/
    store(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ctx.request.body;
                const params1 = {
                    TableName: "wallets",
                    Key: {
                        id: { S: body.from }
                    }
                };
                const params2 = {
                    TableName: "wallets",
                    Key: {
                        id: { S: body.to }
                    }
                };
                const fromData = yield ctx.connection.send(new client_dynamodb_1.GetItemCommand(params1));
                const toData = yield ctx.connection.send(new client_dynamodb_1.GetItemCommand(params2));
                if (body && ((_a = fromData === null || fromData === void 0 ? void 0 : fromData.Item) === null || _a === void 0 ? void 0 : _a.balance.S)) {
                    if (((_b = fromData === null || fromData === void 0 ? void 0 : fromData.Item) === null || _b === void 0 ? void 0 : _b.balance.S) >= (body === null || body === void 0 ? void 0 : body.amount)) {
                        const mainBalance = (_c = fromData === null || fromData === void 0 ? void 0 : fromData.Item) === null || _c === void 0 ? void 0 : _c.balance.S;
                        const netBalance = (parseFloat(mainBalance) - parseFloat(body === null || body === void 0 ? void 0 : body.amount));
                        const exsitingBalance = ((_d = toData === null || toData === void 0 ? void 0 : toData.Item) === null || _d === void 0 ? void 0 : _d.balance.S) ? parseFloat((_e = toData === null || toData === void 0 ? void 0 : toData.Item) === null || _e === void 0 ? void 0 : _e.balance.S) : 0;
                        const params = {
                            RequestItems: {
                                wallets: [
                                    {
                                        PutRequest: {
                                            Item: Object.assign(Object.assign({}, (0, responseParser_1.convertDynamoDBFormat)(fromData.Item)), { balance: netBalance.toFixed(2), todayBalanceChange: (_h = (_g = (_f = fromData.Item) === null || _f === void 0 ? void 0 : _f.todayBalanceChange) === null || _g === void 0 ? void 0 : _g.L) === null || _h === void 0 ? void 0 : _h.push(body.amount || 0) }),
                                        }
                                    },
                                    {
                                        PutRequest: {
                                            Item: Object.assign(Object.assign({}, (0, responseParser_1.convertDynamoDBFormat)(toData.Item)), { balance: (exsitingBalance + parseFloat(body.amount)).toFixed(2), todayBalanceChange: (_l = (_k = (_j = toData.Item) === null || _j === void 0 ? void 0 : _j.todayBalanceChange) === null || _k === void 0 ? void 0 : _k.L) === null || _l === void 0 ? void 0 : _l.push(body.amount || 0) }),
                                        }
                                    }
                                ]
                            }
                        };
                        const command = new lib_dynamodb_1.BatchWriteCommand(params);
                        const result = yield ctx.connection.send(command);
                        ctx.body = result;
                    }
                }
            }
            catch (error) {
                ctx.body = error;
            }
        });
    }
    /**
     * This is a member function of transaction controller
     * This function will return a object of transaction after delte a object from database
     * @param ctx
     * @returns Promise
     **/
    destory(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.params;
            const params = {
                "TableName": "transactions",
                "Key": (0, util_dynamodb_1.marshall)({ id: id })
            };
            const result = yield ctx.connection.send(new client_dynamodb_1.DeleteItemCommand(params));
            console.log(result);
            ctx.body = result;
        });
    }
    /**
     * This is a member function of transaction controller
     * This function will return a object of transaction after update a object in database
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
exports.default = TransectionController;
