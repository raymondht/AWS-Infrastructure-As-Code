import * as cdk from '@aws-cdk/core';
import * as AwsS3 from '@aws-cdk/aws-s3';
import * as AwsS3Deploy from '@aws-cdk/aws-s3-deployment';
import * as AwsCloudfront from '@aws-cdk/aws-cloudfront';
import { AutoDeleteBucket } from '@mobileposse/auto-delete-bucket'
import * as AwsRoute53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';

export default class WebsiteBucket extends cdk.Construct {
    constructor(scope: cdk.Stack, id: string){
        super(scope,id)
        
        const bucket = new AutoDeleteBucket(this, "Website Bucket", {
            bucketName: "cars.erayus.com",
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html",
            publicReadAccess: true            
          });
     
          // Deployment of the website to the bucket
          new AwsS3Deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [AwsS3Deploy.Source.asset('../website/build')],
            destinationBucket: bucket
          });
          
          // Provision of cloudfront distribution
          const distribution = new AwsCloudfront.CloudFrontWebDistribution(this, 'CarsWebDistribution', {
            aliasConfiguration: {
              names: [bucket.bucketName],
              acmCertRef: "arn:aws:acm:us-east-1:112950332271:certificate/b9db332f-206e-4742-96ea-bb313ed07be8",
              sslMethod: AwsCloudfront.SSLMethod.SNI,
              securityPolicy: AwsCloudfront.SecurityPolicyProtocol.TLS_V1_2_2018,
            },
            originConfigs: [
              {
                s3OriginSource: {
                  s3BucketSource: bucket
                },
                behaviors : [ 
                  {isDefaultBehavior: true},
                ]
              
              }
            ],
            defaultRootObject: "index.html"
          });


          // Creation of the A Record in Route 53 to connection the bucket with Cloudfront
          const zone = AwsRoute53.HostedZone.fromLookup(this, 'Zone', { domainName: 'erayus.com' });
          const ARecord = new AwsRoute53.ARecord(this, "CarsWebARecord", {
            recordName: "cars.erayus.com",
            target: AwsRoute53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
            zone: zone
          })

          new cdk.CfnOutput(this, 'output_bucketName', {
            exportName: 'cars-bucketName',
            value: bucket.bucketWebsiteDomainName
          })
          new cdk.CfnOutput(this, 'output_websiteUrl', {
            exportName: 'cars-websiteUrl',
            value: ARecord.domainName
          })
    }
}
