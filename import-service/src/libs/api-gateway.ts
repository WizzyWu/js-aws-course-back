import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler, S3Event } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;
export type ValidatedS3Event = Handler<S3Event>;

export const formatJSONResponse = (response) => {
  return {
    statusCode: response.statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',

    },
    body: JSON.stringify(response.body)
  }
}
