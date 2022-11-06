import { handlerPath } from '@libs/handler-resolver';
import env from './../../../env'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        request: {
        },
      },
    },
  ],
  environment: {
    DYNAMODB_PRODUCTS_TABLE: env.DYNAMODB_PRODUCTS_TABLE,
    DYNAMODB_STOCKS_TABLE: env.DYNAMODB_STOCKS_TABLE,
  },
};
