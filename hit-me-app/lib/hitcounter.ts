import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as tsc from "tsc-prog";
import { RemovalPolicy } from '@aws-cdk/core';

export interface HitCounterProps {
  /** the function for which we want to count url hits **/
  downstream: lambda.Function;
}

export class HitCounter extends cdk.Construct {

    /** allows accessing the counter function */
    public readonly handler: lambda.Function;
    public readonly table: dynamodb.Table;

    constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        this.table = new dynamodb.Table(this, 'HitsTable', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING },
            removalPolicy: RemovalPolicy.DESTROY
        });

        //Compile typescript lambda function
        tsc.build({
            basePath: "",
            clean: ['dist'], // accepts relative paths to `basePath` or absolute paths
            compilerOptions: {
                rootDir: 'lambda',
                outDir: 'lambda/dist',
                target: 'es2018',
                module: 'commonjs',
                declaration: false,
            },
            include: ['lambda/**/*'],
            exclude: ['**/*.test.ts', '**/*.spec.ts', 'cdk.out'],
        })


        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda/dist'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: this.table.tableName
            }
        });
        
        // grant the lambda role read/write permissions to our table
        this.table.grantReadWriteData(this.handler);
        // grant the downstream function read permision to our table
        this.table.grantReadData(props.downstream);
        // grant the lambda role invoke permissions for the handler to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}