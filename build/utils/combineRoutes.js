"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
function combineRouters(routers) {
    return () => {
        if (!Array.isArray(routers)) {
            routers = [...arguments];
        }
        const middleware = [];
        routers.forEach(router => {
            middleware.push(router.routes());
            middleware.push(router.allowedMethods());
        });
        return (0, koa_compose_1.default)(middleware);
    };
}
exports.default = combineRouters;
