import * as cdk from '@aws-cdk/core';
import * as AwsS3 from '@aws-cdk/aws-s3';
import * as AwsS3Deploy from '@aws-cdk/aws-s3-deployment';
import * as AwsCloudfront from '@aws-cdk/aws-cloudfront';
import { AutoDeleteBucket } from '@mobileposse/auto-delete-bucket'
import * as AwsRoute53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
interface ICloudFrontDistributionProps {
  bucket: AwsS3.IBucket
}

export default class CloudfrontDistribution extends cdk.Construct {
    public readonly distribution: AwsCloudfront.CloudFrontWebDistribution;
    
    constructor(scope: cdk.Stack, id: string, props: ICloudFrontDistributionProps){
        super(scope,id)
          // Provision of cloudfront distribution
          const acmCertRefArn = scope.formatArn({
            service: 'acm',
            region: 'us-east-1',
            resource: 'certificate',
            resourceName: 'b9db332f-206e-4742-96ea-bb313ed07be8'
          }); 
          
          this.distribution = new AwsCloudfront.CloudFrontWebDistribution(scope, 'CarsWebDistribution', {
            aliasConfiguration: {
              names: [props.bucket.bucketName],
              acmCertRef:  acmCertRefArn,
              sslMethod: AwsCloudfront.SSLMethod.SNI,
              securityPolicy: AwsCloudfront.SecurityPolicyProtocol.TLS_V1_2_2018,
            },
            originConfigs: [
              {
                s3OriginSource: {
                  s3BucketSource: props.bucket
                },
                behaviors : [ 
                  {isDefaultBehavior: true},
                ]
              
              }
            ],
            defaultRootObject: "index.html"
          });

    }
}
