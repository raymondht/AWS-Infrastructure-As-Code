#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { createCdkPracticeStack } from '../lib/cdk-practice-stack';

const app = new cdk.App();
createCdkPracticeStack(app, 'CdkPracticeStack');
