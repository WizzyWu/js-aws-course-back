import { formatJSONResponse } from '@libs/api-gateway';
import { put } from '../../aws-helpers/dynamodb-functions';
import { productsTablePutParams, stockTablePutParams } from './../../params/db';
import { sns_sendMessage } from '../../aws-helpers/sns-functions';
import * as _ from 'lodash';

const catalogBatchProcess = async (event) => {
  try {
    const products = _.get(event, 'Records', []);

    products.forEach(async (productData) => {
      console.log('productData', productData);
      const product = JSON.parse(_.get(productData, 'body', ''));
      console.log('product', product);
      const { id, title, author, description, img, price, year, count } = product;
      console.log('product parts', id, title, author, description, img, price, year, count)
      // product
      console.log('attempt to add product to database');
      productsTablePutParams.Item = { id, title, author, description, img, price, year };
      await put(productsTablePutParams);
      console.log('product was added to database');
      // stock
      console.log('attempt to add stock info to database');
      stockTablePutParams.Item = { id, count };
      await put(stockTablePutParams);
      console.log('stock info was added to database ');
      // SNS
      console.log('attempt to send data to sns');
      sns_sendMessage(product);
      console.log('data was sent to sns');
    });

    return formatJSONResponse({
      statusCode: 200,
      body: { message: 'All products have been processed'} ,
    });
  } catch (e) {
    console.log('Error:', e.message);
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  }
};

export { catalogBatchProcess as main }
