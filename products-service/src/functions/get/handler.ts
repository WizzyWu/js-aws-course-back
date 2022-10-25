import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as _ from 'lodash';

import schema from './schema';
import { query } from './../../data/dynamo-db-helpers';
import { productsTableQueryParams, stockTableQueryParams } from './../../params/db';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const productId = parseInt(_.get(event, 'pathParameters.productId', null));
    console.log('productId', productId);
    // prepare params
    productsTableQueryParams.ExpressionAttributeValues = {
      ':id': productId,
    };
    stockTableQueryParams.ExpressionAttributeValues = {
      ':id': productId,
    };
    // getting data from db
    const product = await query(productsTableQueryParams);
    const stock = await query(stockTableQueryParams);
    
    if (product) {
      product.count = _.get(stock, 'count', 0);
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
  } catch (e) {
    console.log('Error:', e.message);
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  }
};

export const main = middyfy(getProductById);
