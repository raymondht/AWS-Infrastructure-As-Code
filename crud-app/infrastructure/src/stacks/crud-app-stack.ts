import * as cdk from '@aws-cdk/core';
import WebsiteBucket from '../constructs/WebsiteBucket';
export class CrudAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new WebsiteBucket(this, 'WebsiteBucket');
    // The code that defines your stack goes here
  
  }
}


