import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import config from '..';
describe('testing config', () => {
  test('config port test', () => {
    expect(Number(config.PORT)).toBe(4000);
  });

  test('config port cannot be NAN', () => {
    expect(Number(config.PORT)).not.toBeNaN();
  });

  test('check port data type', () => {
    expect(typeof Number(config.PORT)).toBe('number');
  });

  test('check db connection type is object not not', () => {
    expect(config.connection).toEqual(expect.any(DynamoDBDocumentClient));
  });
});
