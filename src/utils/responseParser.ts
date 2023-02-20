import { AttributeValue } from "@aws-sdk/client-dynamodb";

export function convertDynamoDBFormat(item: { [key: string]: AttributeValue } | undefined): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    Object.entries(item || {}).forEach(([key, value]) => {
        if (value.S)
            result[key] = value.S;
        else if (value.N)
            result[key] = value.N;
        else if (value.BOOL)
            result[key] = value.BOOL
        else if (value.NS)
            result[key]= value.NS
        else if (value.L)
            result[key]= value.L
        else
            result[key] = value;
    });
    return result;
}

