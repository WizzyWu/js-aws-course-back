import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import boardgamesList from 'src/mock-data/boardgamesList'
import * as _ from 'lodash';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const productId = _.get(event, 'pathParameters.productId', null);
  const product = _.find(boardgamesList, function(o) {
    return o.id == productId; 
  });
  if (product) {
    return formatJSONResponse({
      statusCode: 200,
      body: product ,
    });
  }
  // 404 error
  return formatJSONResponse({
    statusCode: 404,
    body: { message: 'Not found' },
  });
};

export const main = middyfy(getProductById);
