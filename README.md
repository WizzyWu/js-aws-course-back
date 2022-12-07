# js-aws-course-back
Repository for backend part of homework at JS AWS Practitioner Course

cd ..
# Links

## Backend
* API (getProductsList): (GET) https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products
* API (getProductsById) (GET) https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products/1
* API (createProduct) (POST) https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products
* API (importProductsFile) (GET) https://vpaqrxcv79.execute-api.eu-west-1.amazonaws.com/dev/import?name=test
* Repository: https://github.com/WizzyWu/js-aws-course-vue
### Backend PR's
* PR Task 3: https://github.com/WizzyWu/js-aws-course-back/pull/1
* PR Task 4: https://github.com/WizzyWu/js-aws-course-back/pull/2
* PR Task 5: https://github.com/WizzyWu/js-aws-course-back/pull/3
* PR Task 6: https://github.com/WizzyWu/js-aws-course-back/pull/4
* PR Task 7: https://github.com/WizzyWu/js-aws-course-back/pull/5

## Frontend:
* Repository: https://github.com/WizzyWu/js-aws-course-back
* CloudFront distribution domain name: https://d29qcu9ke2ed75.cloudfront.net
* S3 Static site host: http://popov-js-aws-course.s3-website-eu-west-1.amazonaws.com/
* API documentation: https://d29qcu9ke2ed75.cloudfront.net/documentation/api.html
### Frontend PR's
* PR Task 2: https://github.com/WizzyWu/js-aws-course-vue/pull/1
* PR Task 3: https://github.com/WizzyWu/js-aws-course-vue/pull/2
* PR Task 5: https://github.com/WizzyWu/js-aws-course-vue/pull/3
* PR Task 7: https://github.com/WizzyWu/js-aws-course-vue/pull/4

# Task 7

## What was done:
## Base tasks
1 (DONE Backend) - authorization-service is added to the repo, has correct basicAuthorizer lambda and correct serverless.yaml file
3 (DONE Backend) - Import Service serverless.yaml file has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. Response should be in 403 HTTP status if access is denied for this user (invalid authorization_token) and in 401 HTTP status if Authorization header is not provided.
5 (DONE Frontend) - Client application is updated to send "Authorization: Basic authorization_token" header on import. Client should get authorization_token value from browser localStorage
## Additional tasks
+1 (DONE Frontend) - Client application should display alerts for the responses in 401 and 403 HTTP statuses. This behavior should be added to the nodejs-aws-fe-main/src/index.tsx file.

# Task 6

## What was done:
## Base tasks
1 (DONE) - File serverless.yml contains configuration for catalogBatchProcess function
2 (DONE) - File serverless.yml contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS
3 (DONE) - File serverless.yml contains configuration for SQS catalogItemsQueue
4 (DONE) - File serverless.yml contains configuration for SNS Topic createProductTopic and email subscription
## Additional tasks
+1 (-) - catalogBatchProcess lambda is covered by unit tests
+1 (DONE) - set a Filter Policy for SNS createProductTopic in serverless.yml and create an additional email subscription to distribute messages to different emails depending on the filter for any product attribute

# Task 5

## What was done:
## Base tasks
1 (DONE) File serverless.yml contains configuration for importProductsFile function
3 (DONE) The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
4 (DONE) Frontend application is integrated with importProductsFile lambda
5 (DONE) The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda
## Additional tasks
+1 (DONE) - async/await is used in lambda functions
+1 (-) - importProductsFile lambda is covered by unit tests. (for JS only) aws-sdk-mock can be used to mock S3 methods
+1 (DONE) - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into a new folder in the same bucket called parsed, and then deleted from uploaded folder)

# Task 4

## What was done:
## Base tasks
1. (DONE) Task 4.1 is implemented
2. (DONE) Task 4.2 is implemented lambda links are provided and returns data
3. (DONE) Task 4.3 is implemented lambda links are provided and products are stored in DB.
4. (DONE) My Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend. Link to a working Frontend application is provided for cross-check reviewer. The links didn't change from Task 3.
## Additional tasks
1. (DONE) POST /products lambda functions returns error 400 status code if product data is invalid
2. (DONE) All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
3. (DONE) All lambdas do console.log for each incoming requests and their arguments
4. (-) Use RDS instance instead fo DynamoDB tables. Do not commit your environment variables in serverless.yml to github!
5. (-) Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa)

# Task 3

## What was done:
## Base tasks
1. (DONE) Product Service Serverless config contains configuration for 2 lambda functions, API is working:
    * https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products
    * https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products/1
2. (DONE) The getProductsList OR getProductsById lambda function returns a correct response (BOTH)
3. (DONE) The getProductsById AND getProductsList lambda functions return a correct response code (POINT2)
4. (DONE) My own Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend. Links are at the top of this document. 

## Additional tasks
1. (DONE) Async/await is used in lambda functions
2. (DONE) ES6 modules are used for Product Service implementation
3. (DONE) Task: Custom Webpack/ESBuild/etc is manually configured for Product Service. Not applicable for preconfigured/built-in bundlers that come with templates, plugins, etc.

    * It was no need for me for webpack. But i manually configured Serverless Ofline Server to build and locally test lambda functions. I think it's the same approach with another instrument. It could be started with 
    `npm run offline`

4. (DONE) Task: SWAGGER documentation is created for Product Service
    * I used another tool - Redoc. Link to result: https://d29qcu9ke2ed75.cloudfront.net/documentation/api.html#operation/getProductById

5. (-) Task: Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered)
    * I didn't complete this task due to errors (jest + typescript)
6. (DONE) Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
7. (DONE) Main error scenarios are handled by API ("Product not found" 404 error). Example: https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products/345
