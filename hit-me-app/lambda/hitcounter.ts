import * as AWS from 'aws-sdk'
import * as AwsLambdaTypes from 'aws-lambda'

const lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
const dynamo = new AWS.DynamoDB({region: 'ap-southeast-2', apiVersion: '2012-08-10'});
export interface IHitCounterPayLoad {
    event: AwsLambdaTypes.APIGatewayEvent,
    tableName: AWS.DynamoDB.TableName
}
exports.handler = async function(event: AwsLambdaTypes.APIGatewayEvent) {

    if (process.env.HITS_TABLE_NAME === undefined) {
        throw new Error(`process.env.HITS_TABLE_NAME is ${process.env.HITS_TABLE_NAME}`)
    }

    if (process.env.DOWNSTREAM_FUNCTION_NAME === undefined) {
        throw new Error(`process.env.DOWNSTREAM_FUNCTION_NAME is ${process.env.DOWNSTREAM_FUNCTION_NAME}`)
    }

    const dynamoRequestParams:AWS.DynamoDB.UpdateItemInput = {
        TableName: process.env.HITS_TABLE_NAME,
        Key: { path: { S: event.path } },
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValues: { ':incr': { N: '1' } }
    }
     
    // update dynamo entry for "path" with hits++
    await dynamo.updateItem(dynamoRequestParams).promise();

    const lambdaRequestParams:AWS.Lambda.InvocationRequest = {
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: JSON.stringify(
            {
                event: event,
                tableName : process.env.HITS_TABLE_NAME
            })
    }

    // call downstream function and capture response
    const resp = await lambda.invoke(lambdaRequestParams).promise();

    // return response back to upstream caller
    return JSON.parse(`${resp.Payload}`);
};