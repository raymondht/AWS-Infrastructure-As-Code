import * as cdk from '@aws-cdk/core';
import { createHitMeStack } from './lib/stacks/hit-me-stack';

import * as tsc from "tsc-prog";

const app = new cdk.App();

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

createHitMeStack(app, 'HitMeStack');
