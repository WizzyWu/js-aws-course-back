import { handlerPath } from '@libs/handler-resolver';
import env from '../../../env';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: env.S3_BUCKET,
        existing: true,
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: env.S3_BUCKET_UPLOADED_CATALOG_PATH,
          }
        ],
      },
    },
  ],
};
