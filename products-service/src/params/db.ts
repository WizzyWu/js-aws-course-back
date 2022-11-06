// scan
export const productsTableScanParams = {
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
}

export const stockTableScanParams = {
    TableName: process.env.DYNAMODB_STOCKS_TABLE
}

// query
export const productsTableQueryParams = {
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: null,
}

export const stockTableQueryParams = {
    TableName: process.env.DYNAMODB_STOCKS_TABLE,
    KeyConditionExpression: 'product_id = :id',
    ExpressionAttributeValues: null,
}

// put
export const productsTablePutParams = {
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
    Item: null,
}

export const stockTablePutParams = {
    TableName: process.env.DYNAMODB_STOCKS_TABLE,
    Item: null,
}