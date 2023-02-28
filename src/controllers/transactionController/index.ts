import {
  GetItemCommand,
  PutItemCommand,
  PutItemCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateItemCommand
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Context } from 'koa';

export default class TransactionController {
  constructor() {}

  /**
   * This is a member function of transaction controller
   * This function will return a array object of transaction
   * @param ctx
   * @returns Promise
   **/
  getAll = async (ctx: Context): Promise<void> => {
    try {
      const params: ScanCommandInput = {
        TableName: 'transactions',
        ConsistentRead: false
      };

      const command: ScanCommand = new ScanCommand(params);
      const results: ScanCommandOutput = await ctx.connection.send(command);

      ctx.sendResponse({
        message: 'Transaction data successfully loaded',
        code: 200,
        status: 'success',
        body: results.Items,
        key: 'transactions'
      });
    } catch (error: any) {
      console.log(error);
      ctx.sendResponse({
        message: error || 'Unknown error occurs',
        code: ctx.status || 500,
        status: 'error',
        body: error,
        key: 'error'
      });
    }
  };

  transfer = async (ctx: Context) => {
    const body: any = ctx.request.body;
    console.log(body);

    const fromParams = {
      TableName: 'wallets',
      Key: marshall({
        id: body.from.id,
        name: body.from.name
      })
    };

    const fromData = await ctx.connection.send(new GetItemCommand(fromParams));

    const parseFromData = unmarshall(fromData.Item, {
      wrapNumbers: true
    });

    if (body && parseFromData?.balance) {
      if (parseFromData.balance >= body?.amount) {
        const params1 = {
          TableName: 'wallets',
          Key: marshall(
            {
              id: body.from.id,
              name: body.from.name
            },
            { removeUndefinedValues: true }
          ),
          UpdateExpression:
            'SET #balance = #balance - :balance, #todayBalanceChange = #todayBalanceChange - :todayBalanceChange',
          ExpressionAttributeValues: marshall(
            {
              ':balance': parseFloat(body.amount),
              ':todayBalanceChange': parseFloat(body.amount)
            },
            { removeUndefinedValues: false }
          ),
          ExpressionAttributeNames: {
            '#balance': 'balance',
            '#todayBalanceChange': 'todayBalanceChange'
          },
          ReturnValues: 'ALL_NEW'
        };

        const params2 = {
          TableName: 'wallets',
          Key: marshall(
            {
              id: body.to.id,
              name: body.to.name
            },
            { removeUndefinedValues: true }
          ),
          UpdateExpression:
            'SET #balance = #balance + :balance, #todayBalanceChange = #todayBalanceChange + :todayBalanceChange',
          ExpressionAttributeValues: marshall(
            {
              ':balance': parseFloat(body.amount),
              ':todayBalanceChange': parseFloat(body.amount)
            },
            { removeUndefinedValues: false }
          ),
          ExpressionAttributeNames: {
            '#balance': 'balance',
            '#todayBalanceChange': 'todayBalanceChange'
          },
          ReturnValues: 'ALL_NEW'
        };

        try {
          const isSend = await ctx.connection.send(new UpdateItemCommand(params1));
          if (isSend) {
            const isRecived = await ctx.connection.send(new UpdateItemCommand(params2));
            if (isRecived) {
              const params = {
                TableName: 'transactions',
                Item: marshall({
                  to: `wallet#${body.to.id}`,
                  from: `wallet#${body.from.id}`,
                  amount: body.amount,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                })
              };
              const created: PutItemCommandOutput = await ctx.connection.send(
                new PutItemCommand(params)
              );
              if (created) {
                ctx.status = 201;
                ctx.sendResponse({
                  message: 'Transfered successfully',
                  code: 201,
                  status: 'success',
                  body: {}
                });
              }
            }
          }
        } catch (error) {
          ctx.sendResponse({
            message: error.message || 'Unknown error occured',
            code: ctx.status || 500,
            status: 'success',
            body: error,
            key: 'error'
          });
        }
      }
    }
  };

  todaysTransaction = async (ctx: Context) => {
    const today = new Date().toISOString().substring(0, 10);
    const params = {
      TableName: 'transactions',
      ConsistentRead: false,
      FilterExpression: 'contains(#createdAt, :createdAt)',
      ExpressionAttributeValues: marshall({
        ':createdAt': today
      }),
      ExpressionAttributeNames: {
        '#createdAt': 'createdAt'
      }
    };

    const command: ScanCommand = new ScanCommand(params);
    const results: ScanCommandOutput = await ctx.connection.send(command);

    ctx.sendResponse({
      message: "Today's transaction generated",
      code: 200,
      body: results.Items,
      key: 'transactions'
    });
  };
}
