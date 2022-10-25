import * as AWS from 'aws-sdk';

export async function scan (params) {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const response = await dynamoDB.scan(params).promise();
        return response.Items;
    } catch (e) {
        console.log (`An error occured during DynamoDB scan request. Params: ${JSON.stringify(params)} Error: ${e.message}`, e.message);
        throw e;
    }
};

export async function query (params) {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const response = await dynamoDB.query(params).promise();
        return response.Items[0];
    } catch (e) {
        console.log (`An error occured during DynamoDB query request. Params: ${JSON.stringify(params)} Error: ${e.message}`, e.message);
        throw e;
    }
}

export async function put (params) {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const response = await dynamoDB.put(params).promise();
        return response;
    } catch (e) {
        console.log (`An error occured during DynamoDB put request. Params: ${JSON.stringify(params)} Error: ${e.message}`, e.message);
        throw e;
    }
}