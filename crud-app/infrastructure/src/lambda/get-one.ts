import * as aws from 'aws-sdk';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';


export const handler = async (event: any = {}) : Promise <any> => {
  const db = new aws.DynamoDB.DocumentClient();
  const requestedCarId = event.pathParameters.id;
  
  if (!requestedCarId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  const params = {
    TableName: TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: requestedCarId
    }
  };

  try {
    const response = await db.get(params).promise();
    return { statusCode: 200, body: JSON.stringify(response.Item) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};