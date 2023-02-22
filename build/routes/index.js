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
const combineRoutes_1 = __importDefault(require("../utils/combineRoutes"));
const tableRoutes_1 = __importDefault(require("./tableRoutes"));
const transectionRoutes_1 = __importDefault(require("./transectionRoutes"));
const walletRoutes_1 = __importDefault(require("./walletRoutes"));
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.body = "Server is running"; }));
const routers = (0, combineRoutes_1.default)([router, walletRoutes_1.default, tableRoutes_1.default, transectionRoutes_1.default]);
exports.default = routers;
