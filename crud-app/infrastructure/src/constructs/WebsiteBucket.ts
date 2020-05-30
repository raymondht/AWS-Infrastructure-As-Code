import * as cdk from '@aws-cdk/core';
import * as AwsS3 from '@aws-cdk/aws-s3';


import { AutoDeleteBucket } from '@mobileposse/auto-delete-bucket'


export default class WebsiteBucket extends cdk.Construct {
  public readonly bucket: AwsS3.IBucket;

  constructor(scope: cdk.Stack, id: string){
    super(scope,id)  
   
      this.bucket = new AutoDeleteBucket(scope, "Website Bucket", {
        bucketName: "cars.erayus.com",
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html",
        publicReadAccess: true            
      });

      new cdk.CfnOutput(scope, 'output_bucketName', {
        exportName: 'cars-bucket-name',
        value: this.bucket.bucketName
      })

      new cdk.CfnOutput(scope, 'output_bucketDomainName', {
        exportName: 'cars-bucket-domain-name',
        value: this.bucket.bucketDomainName
      })
  }
}