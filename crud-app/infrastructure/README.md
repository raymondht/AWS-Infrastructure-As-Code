# CRUD App Infrastructure
## Hosting:
   1. A public S3 bucket to store static website content.
   2. Cloudfront distribution for the website bucket.
   3. A Route 53 ARecord that target distribution (cars.erayus.com)
   4. Deployment of the website code to the created bucket.
## Communication and Computation:
Three API Gateway Endpoints and 3 Lambda functions:
   1. Get all cars
   2. Add a car
   3. Delete a car

## Storage
A DynamoDB that has a table named "Cars"