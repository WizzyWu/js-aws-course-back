import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/list';
import getProductById from '@functions/get';
import createProduct from '@functions/create';
import catalogBatchProcess from '@functions/catalogBatchProcess';
import env from './env'

const serverlessConfiguration: AWS = {
  service: 'products-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
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
      DYNAMODB_PRODUCTS_TABLE: env.DYNAMODB_PRODUCTS_TABLE,
      DYNAMODB_STOCKS_TABLE: env.DYNAMODB_STOCKS_TABLE,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:*',
            ],
            Resource: [
              'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.DYNAMODB_PRODUCTS_TABLE}',
              'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.DYNAMODB_STOCKS_TABLE}',
            ],
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: {
              Ref: 'SNSTopic'
            }
          }
        ]
      }
    },
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'CatalogItemsQueue',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'CreateProductTopic',
        },
      },
      SNSSubscription0: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "wizzy.wu.mails@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
        },
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "wizzymails@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            count: [{ numeric: [">", 0] }],
          },
        },
      },
      SNSSubscription2: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "vadim_popov@epam.com",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            count: [{ numeric: ["=", 0] }],
          },
        },
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct, catalogBatchProcess },
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
