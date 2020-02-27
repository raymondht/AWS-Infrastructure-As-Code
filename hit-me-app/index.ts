// import { buildLambda } from './lib/buildlambda'

// console.log(buildLambda());
// import * as AWS from 'aws-sdk';
// const dynamo = new AWS.DynamoDB({region: 'ap-southeast-2', apiVersion: '2012-08-10'});

// const GetItemParams : AWS.DynamoDB.GetItemInput = {
//     TableName: 'CdkPracticeStack-HelloHitCounterHitsTable4E56919D-1DWZIHT4HD4WL',
//     Key: {
//         path: {"S":"/"}
//     },
//     ProjectionExpression:"hits",
// }
// dynamo.getItem(GetItemParams, (err: any, data:any) => {
//     console.log(data.Item.hits.N);
// })
import * as tsc from "tsc-prog";

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