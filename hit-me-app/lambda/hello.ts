import * as AwsLambdaTypes from 'aws-lambda';
import * as AWS from 'aws-sdk'
import { IHitCounterPayLoad } from './hitcounter';

const db = new AWS.DynamoDB.DocumentClient();
exports.handler = async (payload: IHitCounterPayLoad) => {
    const GetItemParams = {
      TableName: `${payload.tableName}`,
      Key: {
          path: `${payload.event.path}`
      },
      ProjectionExpression: "hits",
    };

    try {
        const response = await  db.get(GetItemParams).promise();
        if (!response.Item) throw new Error("No item found")
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: `Hello, CDK! You've hit me at ${payload.event.path} with ${response.Item.hits} hit(s)`
        }
    }
    catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }

  };