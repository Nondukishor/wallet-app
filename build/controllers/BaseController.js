"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    getAll(ctx) {
        throw new Error("Method not implemented.");
    }
    getById(ctx) {
        throw new Error("Method not implemented.");
    }
    store(ctx) {
        throw new Error("Method not implemented.");
    }
    destory(ctx) {
        throw new Error("Method not implemented.");
    }
    update(ctx) {
        throw new Error("Method not implemented.");
    }
}
exports.default = BaseController;
