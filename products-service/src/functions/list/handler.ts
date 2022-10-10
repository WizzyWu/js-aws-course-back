import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import boardgamesList from 'src/mock-data/boardgamesList'

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse({
    statusCode: 200,
    body: boardgamesList,
  });
};

export const main = middyfy(getProductsList);
