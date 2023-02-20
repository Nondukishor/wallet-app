import { CustomContext } from "../../types/globalTypes";
import { DeleteItemCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb"

export default class TableOperationController {

  async deleteTable(ctx: CustomContext): Promise<void> {
    try {
      const params = {
        "TableName": ctx.params.name
      }

      const results = await ctx.connection.send(new DeleteTableCommand(params))
       
      ctx.body=results
    } catch (error:any) {
       ctx.body = error
    }
  }
  async deleteAllData(ctx: CustomContext): Promise<void> {
    try {
      const params = {
        "TableName": ctx.params.name,
        "Key": {
          "id": {
            "S": "id"
          }
        },
        "ConditionExpression": "#87ea0 <= :87ea0",
        "ExpressionAttributeValues": {
          ":87ea0": {
            "S": "0"
          }
        },
        "ExpressionAttributeNames": {
          "#87ea0": "id"
        }
      }

      const results = await ctx.connection.send(new DeleteItemCommand(params))
       
      ctx.body=results
    } catch (error:any) {
       ctx.body = error
    }
  }
}
