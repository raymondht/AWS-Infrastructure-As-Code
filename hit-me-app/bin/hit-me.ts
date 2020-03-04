#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { createHitMeStack } from '../lib/hit-me-stack';

const app = new cdk.App();
createHitMeStack(app, 'HitMeStack');
