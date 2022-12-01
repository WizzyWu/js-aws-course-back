import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import env from '../../env';

export async function sns_sendMessage (product) {
    const commandParams = {
        Subject: 'Product added',
        Message: `Product was successfully added to db: ${JSON.stringify(product)}`,
        TopicArn: env.SNS_TOPIC_ARN,
        MessageAttributes: {
            count: {
                DataType: 'Number',
                StringValue: product.count,
            }
        }
    }
    try {
        const sns = new SNSClient({ region: env.AWS_REGION });
        const command = new PublishCommand(commandParams);
        const result = await sns.send(command);
    } catch (e) {
        console.log (`An error occured during interaction with SNS. Params: ${JSON.stringify(commandParams)} Error: ${e.message}`, e.message);
        throw e;
    }
};