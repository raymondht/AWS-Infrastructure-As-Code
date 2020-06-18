#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HostingStack } from './src/stacks/hosting-stack';
import { DeploymentStack } from './src/stacks/deployment-stack';
import {ComStack} from './src/stacks/com-stack';
import * as tsc from "tsc-prog";

const app = new cdk.App();
const env = {
    region: 'ap-southeast-2', 
    account: '112950332271'
}

const hostingStack = new HostingStack(app, 'cars-hosting-stack', {env});
const deploymentStack = new DeploymentStack(app, 'cars-deployment-stack', {env});
const commStack = new ComStack(app, 'cars-communication-stack', {env});
deploymentStack.addDependency(hostingStack);