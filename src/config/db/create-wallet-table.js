const { CreateTableCommand, DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  endpoint: "http://localhost:8000",
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const params = {
  AttributeDefinitions: [
    {
      AttributeName: "id", //ATTRIBUTE_NAME_1
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
    {
      AttributeName: "name", //ATTRIBUTE_NAME_2
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: "id", //ATTRIBUTE_NAME_1
      KeyType: "HASH",
    },
    {
      AttributeName: "name", //ATTRIBUTE_NAME_2
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "wallets", //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

// Create the DynamoDB table
client
  .send(new CreateTableCommand(params))
  .then(() => console.log(`Table created successfully`))
  .catch((error) => console.log(`Table cannot create error`, error));
