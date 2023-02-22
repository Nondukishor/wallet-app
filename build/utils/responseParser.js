"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDynamoDBFormat = void 0;
function convertDynamoDBFormat(item) {
    const result = {};
    Object.entries(item || {}).forEach(([key, value]) => {
        if (value.S)
            result[key] = value.S;
        else if (value.N)
            result[key] = value.N;
        else if (value.BOOL)
            result[key] = value.BOOL;
        else if (value.NS)
            result[key] = value.NS;
        else if (value.L)
            result[key] = value.L;
        else
            result[key] = value;
    });
    return result;
}
exports.convertDynamoDBFormat = convertDynamoDBFormat;
