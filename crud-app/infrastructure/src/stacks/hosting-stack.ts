import * as cdk from '@aws-cdk/core';
import WebsiteBucket from '../constructs/WebsiteBucket';
import CloudfrontDistribution from '../constructs/CloudfrontDistribution';

import Route53ARecord from '../constructs/Route53ARecord';


export class HostingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const webBucket = new WebsiteBucket(
      this, 
      'cars-website-bucket')

    const cloudfrontDistribution  = new CloudfrontDistribution(
      this, 
      'cars-cloudfront-distribution', 
      {bucket: webBucket.bucket});

    const route53ARecord = new Route53ARecord(
      this,
      'cars-route53-ARecord',
      {distribution: cloudfrontDistribution.distribution}
    ) 
  }
}


