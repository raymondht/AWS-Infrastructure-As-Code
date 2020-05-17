### CRUD App Infrastructure
1. A public S3 bucket to store static website content.
2. A Route 53 record that points to that bucket (cars.erayus.com)
3. Three API Gateway Endpoints to invoke 3 Lambda functions:
   1. Get all cars
   2. Add a car
   3. Delete a car
4. A DynamoDB named "Cars"