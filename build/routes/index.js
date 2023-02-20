"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const combineRoutes_1 = __importDefault(require("../utils/combineRoutes"));
const walletRoutes_1 = __importDefault(require("./walletRoutes"));
exports.default = (0, combineRoutes_1.default)([walletRoutes_1.default]);
