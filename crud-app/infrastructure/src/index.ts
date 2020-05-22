#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CrudAppStack } from './stacks/crud-app-stack';

const app = new cdk.App();
const env = {
    region: 'ap-southeast-2', 
    account: '112950332271'
}
new CrudAppStack(app, 'CrudAppStack', {env});
