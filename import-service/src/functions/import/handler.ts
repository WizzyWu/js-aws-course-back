import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as _ from 'lodash';
import { s3_getSignedUrl } from '../../aws-helpers/s3-functions';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { queryStringParameters } = event;
  try {
    const fileName = _.get(queryStringParameters, 'name', null);

    if (!fileName) {
      return formatJSONResponse({
        statusCode: 400,
        body: { message: 'Bad request' },
      });
    }

    const signedUrl = await s3_getSignedUrl(fileName);
    return formatJSONResponse({
      statusCode: 200,
      body: { signedUrl },
    });
  } catch (e) {
    console.log('Error:', e.message);
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  }
};

export const main = middyfy(importProductsFile);
