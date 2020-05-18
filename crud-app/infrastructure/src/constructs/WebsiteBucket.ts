import * as cdk from '@aws-cdk/core';
import * as AwsS3 from '@aws-cdk/aws-s3';

export default class WebsiteBucket extends cdk.Construct {
    constructor(scope: cdk.Stack, id: string){
        super(scope,id)
        
        const bucket = new AwsS3.Bucket(this, "Website Bucket", {
            bucketName: "cars.erayus.com",
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html",
            publicReadAccess: true
          });

          new cdk.CfnOutput(this, 'output_bucketName', {
            exportName: 'cars-bucketName',
            value: bucket.bucketWebsiteDomainName
          })
    }
}
