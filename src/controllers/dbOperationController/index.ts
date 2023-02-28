import { DeleteItemCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { Context } from 'koa';
export default class TableOperationController {
  async deleteTable(ctx: Context): Promise<void> {
    try {
      const params = {
        TableName: ctx.params.name
      };

      const results = await ctx.connection.send(new DeleteTableCommand(params));

      ctx.body = results;
    } catch (error: any) {
      ctx.body = error;
    }
  }
  async deleteAllData(ctx: Context): Promise<void> {
    try {
      const params = {
        TableName: ctx.params.name,
        Key: {
          id: {
            S: 'id'
          }
        },
        ConditionExpression: '#87ea0 <= :87ea0',
        ExpressionAttributeValues: {
          ':87ea0': {
            S: '0'
          }
        },
        ExpressionAttributeNames: {
          '#87ea0': 'id'
        }
      };

      const results = await ctx.connection.send(new DeleteItemCommand(params));

      ctx.body = results;
    } catch (error: any) {
      ctx.body = error;
    }
  }
}
