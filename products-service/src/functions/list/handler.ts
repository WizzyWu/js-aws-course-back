import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as _ from 'lodash';
import schema from './schema';
import { scan } from './../../data/dynamo-db-helpers';
import { productsTableScanParams, stockTableScanParams } from './../../params/db';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    console.log('Request getProductsList');
    const products = await scan(productsTableScanParams);
    const stocks = await scan (stockTableScanParams);
    const result = products.map((product) => {
      const stock = stocks.find((st) => st.product_id == product.id);
      product.count = _.get(stock, 'count', 0);
      return product;
    });
    return formatJSONResponse({
      statusCode: 200,
      body: result,
    });
  } catch (e) {
    console.log('Error:', e.message);
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  }
  
};

export const main = middyfy(getProductsList);
