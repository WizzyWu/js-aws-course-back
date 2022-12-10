import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  console.log('app init');
  await app.init();
  console.log('app instance');
  const expressApp = app.getHttpAdapter().getInstance();
  console.log('app return');
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  event.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  };
  console.log('event', event);
  server = server ?? (await bootstrap());
  console.log('process');
  const result = server(event, context, callback).then((res) => {
    console.log('res',res);
    res.multiValueHeaders['Access-Control-Allow-Origin'] = ['*'];
    res.multiValueHeaders['Access-Control-Allow-Credentials'] = ['true'];
    return res;
  });
  return result;
};
