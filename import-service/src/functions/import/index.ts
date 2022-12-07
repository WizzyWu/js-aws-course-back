import { handlerPath } from '@libs/handler-resolver';
import env from '../../../env';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          arn: env.AUTHORIZER_LAMBDA_ARN,
          name: "basicAuthorizer",
          type: "token",
        },
      },
    },
  ],
};
