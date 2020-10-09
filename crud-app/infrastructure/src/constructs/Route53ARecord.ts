import * as cdk from '@aws-cdk/core';
import * as AwsS3 from '@aws-cdk/aws-s3';
import * as AwsS3Deploy from '@aws-cdk/aws-s3-deployment';
import * as AwsCloudfront from '@aws-cdk/aws-cloudfront';
import { AutoDeleteBucket } from '@mobileposse/auto-delete-bucket'
import * as AwsRoute53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';

interface IRoute53ARecord {
  distribution: AwsCloudfront.CloudFrontWebDistribution
}

export default class Route53ARecord extends cdk.Construct {
    constructor(scope: cdk.Stack, id: string, props: IRoute53ARecord){
        super(scope,id)
      
          // Creation of the A Record in Route 53 to connection the bucket with Cloudfront
          const zone = AwsRoute53.HostedZone.fromLookup(scope, 'Zone', { domainName: 'erayus.com' });
          const ARecord = new AwsRoute53.ARecord(scope, "CarsWebARecord", {
            recordName: "cars.erayus.com",
            target: AwsRoute53.RecordTarget.fromAlias(new targets.CloudFrontTarget(props.distribution)),
            zone: zone
          })

          new cdk.CfnOutput(scope, 'output_websiteUrl', {
            exportName: 'cars-websiteUrl',
            value: ARecord.domainName
          })
    }
}
