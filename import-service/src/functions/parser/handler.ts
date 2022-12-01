import type { ValidatedS3Event } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { Stream , Readable} from 'stream';

import * as _ from 'lodash';
import csv from 'csv-parser';
import { s3_getObject, s3_copyObject, s3_deleteObject } from '../../aws-helpers/s3-functions';
import { sqs_sendMessage } from '../../aws-helpers/sqs-functions';

const importFileParser: ValidatedS3Event = async (event) => {
  try {
    const s3Key = _.get(event, 'Records[0].s3.object.key', null);
    console.log('s3Key', s3Key);

    if (s3Key) {
      const response = await s3_getObject(s3Key);
      console.log('S3 response', response);

      for await (const chunk of (response.Body as Readable).pipe(csv())) {
        sqs_sendMessage(chunk);
      }
      // move object to processed folder
      await s3_copyObject(s3Key);
      await s3_deleteObject(s3Key);
      return formatJSONResponse({
        statusCode: 200,
        body: { message: 'Success' },
      });
    }
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  } catch (e) {
    console.log('Error:', e.message);
    return formatJSONResponse({
      statusCode: 500,
      body: { message: 'An error occured during execution' },
    });
  }
};

export { importFileParser as main }
