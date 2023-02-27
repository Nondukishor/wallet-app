const { CreateTableCommand, DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  endpoint: "http://localhost:8000",
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const transactions = {
  TableName: "transactions",
  KeySchema: [
    {
      AttributeName: "to",
      KeyType: "HASH",
    },
    {
      AttributeName: "from",
      KeyType: "RANGE",
    },
  ],
  BillingMode: "PROVISIONED",
  AttributeDefinitions: [
    {
      AttributeName: "to",
      AttributeType: "S",
    },
    {
      AttributeName: "from",
      AttributeType: "S",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

client
  .send(new CreateTableCommand(transactions))
  .then(() => console.log(`${transactions.TableName} created successfully`))
  .catch((error) => console.log(`Table cannot create error`, error));
