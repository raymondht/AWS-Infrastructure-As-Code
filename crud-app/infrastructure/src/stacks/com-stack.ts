
import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class ComStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // API Gateway
        const api = new apigateway.RestApi(this, 'cars-api', {
            restApiName: 'Cars Service'
        });

        const dynamoTable = new dynamodb.Table(this, 'cars-table', {
          partitionKey: {
            name: 'carId',
            type: dynamodb.AttributeType.STRING
          },
          tableName: 'cars',
          // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
          // the new table, and it will remain in your account until manually deleted. By setting the policy to 
          // DESTROY, cdk destroy will delete the table (even if it has data in it)
          removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
        });
        
        

    // const getOneLambda = new lambda.Function(this, 'getOneItemFunction', {
    //     code: new lambda.AssetCode('src/lambda/dist'),
    //     handler: 'get-one.handler',
    //     runtime: lambda.Runtime.NODEJS_10_X,
    //     environment: {
    //       TABLE_NAME: dynamoTable.tableName,
    //       PRIMARY_KEY: 'carId'
    //     }
    //   });
      
    //   const getAllLambda = new lambda.Function(this, 'getAllItemsFunction', {
    //     code: new lambda.AssetCode('src/lambda/dist'),
    //     handler: 'get-all.handler',
    //     runtime: lambda.Runtime.NODEJS_10_X,
    //     environment: {
    //       TABLE_NAME: dynamoTable.tableName,
    //       PRIMARY_KEY: 'carId'
    //     }
    //   });
  
      const createOne = new lambda.Function(this, 'createCarFunction', {
        code: new lambda.AssetCode('src/lambda'),
        handler: 'create-py.handler',
        runtime: lambda.Runtime.PYTHON_3_7,
        environment: {
          TABLE_NAME: dynamoTable.tableName,
          PRIMARY_KEY: 'carId'
        }
      });
  
      // const updateOne = new lambda.Function(this, 'updateItemFunction', {
      //   code: new lambda.AssetCode('src'),
      //   handler: 'update-one.handler',
      //   runtime: lambda.Runtime.NODEJS_10_X,
      //   environment: {
      //     TABLE_NAME: dynamoTable.tableName,
      //     PRIMARY_KEY: 'carId'
      //   }
      // });
  
      // const deleteOne = new lambda.Function(this, 'deleteItemFunction', {
      //   code: new lambda.AssetCode('src'),
      //   handler: 'delete-one.handler',
      //   runtime: lambda.Runtime.NODEJS_10_X,
      //   environment: {
      //     TABLE_NAME: dynamoTable.tableName,
      //     PRIMARY_KEY: 'itemId'
      //   }
      // });
      
        dynamoTable.grantReadWriteData(createOne);
        // dynamoTable.grantReadWriteData(getOneLambda);
        // dynamoTable.grantReadWriteData(getAllLambda);
        

        const cars = api.root.addResource('cars');
        // onst getAllIntegration = new apigateway.LambdaIntegration(getAllLambda);
        // cars.addMethod('GET', getAllIntegration);

        const createOneIntegration = new apigateway.LambdaIntegration(createOne);
        cars.addMethod('POST', createOneIntegration);
        addCorsOptions(cars);

        // const singleItem = cars.addResource('{id}');
        // const getOneIntegration = new apigateway.LambdaIntegration(getOneLambda);
        // singleItem.addMethod('GET', getOneIntegration);

        // const updateOneIntegration = new apigateway.LambdaIntegration(updateOne);
        // singleItem.addMethod('PATCH', updateOneIntegration);

        // const deleteOneIntegration = new apigateway.LambdaIntegration(deleteOne);
        // singleItem.addMethod('DELETE', deleteOneIntegration);
        // addCorsOptions(singleItem);
    }
}
export function addCorsOptions(apiResource: apigateway.IResource) {
    apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
      integrationResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
          'method.response.header.Access-Control-Allow-Origin': "'*'",
          'method.response.header.Access-Control-Allow-Credentials': "'false'",
          'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
        },
      }],
      passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": "{\"statusCode\": 200}"
      },
    }), {
      methodResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Headers': true,
          'method.response.header.Access-Control-Allow-Methods': true,
          'method.response.header.Access-Control-Allow-Credentials': true,
          'method.response.header.Access-Control-Allow-Origin': true,
        },  
      }]
    });
  }