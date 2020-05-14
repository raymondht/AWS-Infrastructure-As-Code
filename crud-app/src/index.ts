#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CrudAppStack } from '../src/stacks/crud-app-stack';

const app = new cdk.App();
new CrudAppStack(app, 'CrudAppStack');
