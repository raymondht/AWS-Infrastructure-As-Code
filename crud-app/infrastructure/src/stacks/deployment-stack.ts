import * as cdk from '@aws-cdk/core';
import * as AwsS3Deploy from '@aws-cdk/aws-s3-deployment';
import * as s3 from '@aws-cdk/aws-s3';


export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Deployment of the website to the bucket
    const destinationBucket = s3.Bucket.fromBucketName(
      this, 
      'cars-imported-bucket',
      cdk.Fn.importValue('cars-bucket-name')
    );

    new AwsS3Deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [AwsS3Deploy.Source.asset('../website/build')],
      destinationBucket: destinationBucket
    });
  }
}


