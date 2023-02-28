const { CreateTableCommand, DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '',
    secretAccessKey: ''
  }
});

const wallets = {
  TableName: 'wallets',
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'name',
      KeyType: 'RANGE'
    }
  ],
  BillingMode: 'PROVISIONED',
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'name',
      AttributeType: 'S'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

client
  .send(new CreateTableCommand(wallets))
  .then(() => console.log(`${wallets.TableName} created successfully`))
  .catch(error => console.log('Table cannot create error', error));
