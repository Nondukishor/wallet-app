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
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
dotenv_1.default.config({
    path: `${path_1.default.resolve(__dirname, '../../.env.development')}`
});
exports.client = new client_dynamodb_1.DynamoDBClient({
    endpoint: process.env.DYNAMODB_ENDPOINT,
    region: process.env.DYNAMODB_REGION,
    credentials: {
        accessKeyId: '26xbe',
        secretAccessKey: '32woh',
    }
});
//connect database 
const connectDatabase = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.state.dynamodb = exports.client;
    yield next();
});
const config = {
    PORT: process.env.PORT || 4000,
    database: connectDatabase
};
//config object freeze so that nobody can change it.
Object.freeze(config);
exports.default = config;
