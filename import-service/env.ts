export default {
    S3_BUCKET: 'popov-js-aws-course-import',
    S3_BUCKET_REGION: 'eu-west-1',
    S3_BUCKET_UPLOADED_CATALOG_PATH: 'uploaded/',
    S3_BUCKET_PROCESSED_CATALOG_PATH: 'parsed/',
    SQS_QUEUE_ARN: 'arn:aws:sqs:eu-west-1:082503310785:CatalogItemsQueue',
    SQS_QUEUE_URL: 'https://sqs.eu-west-1.amazonaws.com/082503310785/CatalogItemsQueue',
    AUTHORIZER_LAMBDA_ARN: 'arn:aws:lambda:eu-west-1:082503310785:function:authorization-service-dev-basicAuthorizer',
}