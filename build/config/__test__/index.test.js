"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
describe("testing config", () => {
    test("config port test", () => {
        expect(Number(__1.default.PORT)).toBe(4000);
    });
    test("config port cannot be NAN", () => {
        expect(Number(__1.default.PORT)).not.toBeNaN();
    });
    test("check port data type", () => {
        expect(typeof Number(__1.default.PORT)).toBe('number');
    });
    test("check db connection type is object not not", () => {
        expect(__1.default.connection).toEqual(expect.any(Object));
    });
});
