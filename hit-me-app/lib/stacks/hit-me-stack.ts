
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { HitCounter } from '../constructs/hitcounter';
import { Duration } from '@aws-cdk/core';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export const createHitMeStack = async (scope: cdk.App, id: string, props?: cdk.StackProps) => {
    const stack = new cdk.Stack(scope, id, props);

    const helloFn = new lambda.Function(stack, 'HelloHandler', {
        runtime: lambda.Runtime.NODEJS_10_X,
        code: lambda.Code.fromAsset('lambda/dist'),
        handler: 'hello.handler',
        timeout: Duration.seconds(5)
    });

    
    const helloWithCounter = new HitCounter(stack, 'HelloHitCounter', {
        downstream: helloFn
      });

    new apigw.LambdaRestApi(stack, 'HitMeAPIEndpoint', {
        handler: helloWithCounter.handler
    });

    new TableViewer(stack, 'ViewHitCounter', {
        title: 'Hello Hits',
        table: helloWithCounter.table,
        sortBy: '-hits'
      });

    return stack
}