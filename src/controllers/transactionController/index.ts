import { CustomContext } from "../../types/globalTypes";
import { ScanCommand, GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb"
import {marshall} from "@aws-sdk/util-dynamodb"
import { convertDynamoDBFormat } from "../../utils/responseParser";
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

export default class TransectionController {
  tableName:string;
  constructor(){
    this.tableName="transaction"
  }
  /**
   * This is a member function of transaction controller
   * This function will return a array object of transaction
   * @param ctx
   * @returns Promise
   **/
  async getAll(ctx: CustomContext): Promise<void> {
    try {
      const params = {
        "TableName": this.tableName
      }
      
      const command = new ScanCommand(params)

      const results = await ctx.state.dynamodb.send(command)

      if(results){
         const transactionsData = results.Items?.map(convertDynamoDBFormat)
         ctx.status=200
         ctx.message="Fetch successfully"
         ctx.body = {
          transactions:transactionsData 
        }}
    } catch (error:any) {
       ctx.body = error
    }
  }

  

  /**
   * This is a member function of transaction controller
   * This function will return a object of transaction after store a object in database
   * @param ctx
   * @returns Promise
   **/
  async store(ctx: CustomContext): Promise<void> {
    try {
      const body:any = ctx.request.body
      const params1 = {
        TableName: "wallets", 
        Key: {
          id: {S: body.from}
        }
      };
      const params2 = {
        TableName: "wallets", 
        Key: {
          id: {S: body.to}
        }
      };

      const fromData = await ctx.state.dynamodb.send(new GetItemCommand(params1))
      const toData = await ctx.state.dynamodb.send(new GetItemCommand(params2))
      if(body && fromData?.Item?.balance.S){
       
        if(fromData?.Item?.balance.S >= body?.amount){
          const mainBalance:string = fromData?.Item?.balance.S

          const netBalance:number = (parseFloat(mainBalance) - parseFloat(body?.amount))

          const exsitingBalance: number = toData?.Item?.balance.S ? parseFloat(toData?.Item?.balance.S) : 0

          const params = {
            RequestItems: {
              wallets: [
                {
                  PutRequest: {
                    Item: {
                      ...convertDynamoDBFormat(fromData.Item),
                      balance:netBalance.toFixed(2),
                      todayBalanceChange: fromData.Item?.todayBalanceChange?.L?.push(body.amount || 0)
                    },
                    ReturnValues: 'PUTED_NEW'
                  }
                },
                {
                  PutRequest: {
                    Item: {
                      ...convertDynamoDBFormat(toData.Item),
                      balance: (exsitingBalance + parseFloat(body.amount)).toFixed(2),
                      todayBalanceChange: toData.Item?.todayBalanceChange?.L?.push(body.amount || 0)
                    },
                    ReturnValues: 'PUTED_NEW'
                  }
                }
              ]
            }
          };


        const command = new BatchWriteCommand(params)

        const result =  await ctx.state.dynamodb.send(command)
        ctx.body=result

        }
      }
    } catch (error) {
      ctx.body= error
    }
  }

  /**
   * This is a member function of transaction controller
   * This function will return a object of transaction after delte a object from database
   * @param ctx
   * @returns Promise
   **/
  async destory(ctx: CustomContext): Promise<void> {
    const { id } = ctx.params;
    const params = {
      "TableName": "transactions",
        "Key": marshall({id: id})
    }
    const result = await ctx.state.dynamodb.send(new DeleteItemCommand(params))
    console.log(result)
    ctx.body=result
  }

  /**
   * This is a member function of transaction controller
   * This function will return a object of transaction after update a object in database
   * @param ctx
   * @returns Promise
   **/
  async update(ctx: CustomContext): Promise<void> {
    const { id } = ctx.params;
    ctx.body = "store function";
  }
}
