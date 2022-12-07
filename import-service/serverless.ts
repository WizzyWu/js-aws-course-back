import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/import';
import importFileParser from '@functions/parser';
import env from 'env';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:ListBucket',
            ],
            Resource: [
              'arn:aws:s3:::popov-js-aws-course-import',
            ],
          },
          {
            Effect: 'Allow',
            Action: [
              's3:*',
            ],
            Resource: [
              'arn:aws:s3:::popov-js-aws-course-import/*',
            ],
          },
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: [
              env.SQS_QUEUE_ARN,
            ],
          }
        ]
      }
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Credentials": "'true'",
            "gatewayresponse.header.Access-Control-Allow-Methods": "'GET,OPTIONS'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'Content-Type,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: 'vpaqrxcv79',
        },
      },
      GatewayResponseDefault5XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Credentials": "'true'",
            "gatewayresponse.header.Access-Control-Allow-Methods": "'GET,OPTIONS'",
          },
          ResponseType: 'DEFAULT_5XX',
          RestApiId: 'vpaqrxcv79',
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
