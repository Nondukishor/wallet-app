"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const combineRoutes_1 = __importDefault(require("../../utils/combineRoutes"));
const koa_1 = __importDefault(require("koa"));
const supertest_1 = __importDefault(require("supertest"));
describe('combineRouters', () => {
    test('should return a middleware function that combines all router middlewares', () => {
        const app = new koa_1.default();
        const router1 = new koa_router_1.default();
        const router2 = new koa_router_1.default();
        const router3 = new koa_router_1.default();
        router1.get('/foo', ctx => {
            ctx.body = {
                message: "Hello World"
            };
        });
        router2.post('/bar', ctx => {
            ctx.body = 'bar';
        });
        router3.put('/baz', ctx => {
            ctx.body = 'baz';
        });
        app.use((0, combineRoutes_1.default)([router1, router2, router3])());
        const req = (0, supertest_1.default)(app);
        const server = app.listen(3000, () => {
            const address = server.address();
            console.log(`Server listening on ${address}:${address}`);
        });
        // expect(combineRouters).toHaveBeenCalledWith([router1, router2, router3])
        req.get('/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    });
});
