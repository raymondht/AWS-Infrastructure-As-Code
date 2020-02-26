#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { SampleAppStack } from '../lib/sample-app-stack';

const app = new cdk.App();
new SampleAppStack(app, 'SampleAppStack');
