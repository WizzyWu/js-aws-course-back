import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult, PolicyDocument } from "aws-lambda";

import * as _ from 'lodash';

enum Actions {
  ALLOW = "Allow",
  DENY = "Deny",
}

function generatePolicy(resourceArn:string,  action:Actions = Actions.ALLOW):PolicyDocument {
  return {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: action,
      Resource: resourceArn,
    }],
  };
}

const parseAuthToken = (authorizationToken: string) => {
  const encodedData = authorizationToken.split(" ")[1];
  console.log(encodedData);
  const plainData = Buffer.from(encodedData, "base64").toString().split(":");
  console.log(plainData);
  const username = plainData[0];
  const password = plainData[1];

  return {
    principalId: encodedData,
    username,
    password,
  };
};

const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent): Promise <APIGatewayAuthorizerResult> => {
  const { authorizationToken } = event;
  console.log('authToken', authorizationToken);
  let action = Actions.ALLOW;

  if (!authorizationToken) {
    action = Actions.DENY;
    return {
      principalId: 'undefined',
      policyDocument: generatePolicy(event.methodArn, action),
    };
  }

  const { username, password, principalId } = parseAuthToken(authorizationToken);
  console.log('username, password, principalId', username, password, principalId);

  const storedUserPassword = process.env[username];
  console.log('storedUserPassword', storedUserPassword);

  if (!storedUserPassword || storedUserPassword !== password) {
    action = Actions.DENY;
  }

  return {
    principalId: principalId,
    policyDocument: generatePolicy(event.methodArn, action),
  };
};

export const main = basicAuthorizer;
