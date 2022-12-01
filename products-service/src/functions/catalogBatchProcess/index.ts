import { handlerPath } from '@libs/handler-resolver';
import env from './../../../env'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn:env.SQS_QUEUE_ARN,
        batchSize: 5,
      },
    },
  ],
};
