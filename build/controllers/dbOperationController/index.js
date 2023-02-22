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
class TableOperationController {
    deleteTable(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    "TableName": ctx.params.name
                };
                const results = yield ctx.connection.send(new client_dynamodb_1.DeleteTableCommand(params));
                ctx.body = results;
            }
            catch (error) {
                ctx.body = error;
            }
        });
    }
    deleteAllData(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    "TableName": ctx.params.name,
                    "Key": {
                        "id": {
                            "S": "id"
                        }
                    },
                    "ConditionExpression": "#87ea0 <= :87ea0",
                    "ExpressionAttributeValues": {
                        ":87ea0": {
                            "S": "0"
                        }
                    },
                    "ExpressionAttributeNames": {
                        "#87ea0": "id"
                    }
                };
                const results = yield ctx.connection.send(new client_dynamodb_1.DeleteItemCommand(params));
                ctx.body = results;
            }
            catch (error) {
                ctx.body = error;
            }
        });
    }
}
exports.default = TableOperationController;
