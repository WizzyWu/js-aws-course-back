import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as _ from 'lodash';

import schema from './schema';
import { put } from './../../data/dynamo-db-helpers';
import { productsTablePutParams } from './../../params/db';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const productData = JSON.parse(JSON.parse(_.get(event, 'body', null)));
    console.log('productData', productData);
    console.log('typeof productData', typeof productData);
    // fields check
    const errorMessages = [];
    if (!productData.id || typeof productData.id !== 'number') errorMessages.push('id field is required and <number> is expected');
    if (!productData.title || typeof productData.title !== 'string') errorMessages.push('title field is required and <string> is expected');
    if (errorMessages.length > 0) {
      return formatJSONResponse({
        statusCode: 400,
        body: { message: `Product data is invalid: ${errorMessages.join('. ')}`} ,
      });
    }
    // prepare params
    productsTablePutParams.Item = productData

    // getting data from db
    await put(productsTablePutParams);

    return formatJSONResponse({
      statusCode: 200,
      body: { message: 'Product was created successfully'} ,
    });
  } catch (e) {
    console.log('Error:', e.message);
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  }
};

export const main = middyfy(createProduct);
