import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import env from '../../env';

export async function sqs_sendMessage (product) {
    const commandParams = {
        QueueUrl: env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(product),
    };
    try {
        const sqs = new SQSClient({ region: env.S3_BUCKET_REGION });
        const command = new SendMessageCommand(commandParams);
        const response = await sqs.send(command);
    } catch (e) {
        console.log (`An error occured during interaction with SQS. Params: ${JSON.stringify(commandParams)} Error: ${e.message}`, e.message);
        throw e;
    }
};