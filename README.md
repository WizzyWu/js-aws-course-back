# js-aws-course-back
Repository for backend part of homework at JS AWS Practitioner Course


# Links

### Backend
* API (getProductsList): https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products
* API (getProductsById) https://te38q1ychd.execute-api.eu-west-1.amazonaws.com/dev/products/1
* Repository: https://github.com/WizzyWu/js-aws-course-vue
* PR Task 3: (this)

### Frontend:
* Repository: https://github.com/WizzyWu/js-aws-course-back
* PR Task 3: https://github.com/WizzyWu/js-aws-course-vue/pull/2
* CloudFront distribution domain name: https://d29qcu9ke2ed75.cloudfront.net
* S3 Static site host: http://popov-js-aws-course.s3-website-eu-west-1.amazonaws.com/
* API documentation: https://d29qcu9ke2ed75.cloudfront.net/documentation/api.html


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
7. (DONE) Main error scenarios are handled by API ("Product not found" 404 error).
