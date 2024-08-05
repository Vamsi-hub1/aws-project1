# Travel Detail Recorder

### Objective

This project aims to create a static webpage hosted on AWS S3 that allows users to submit details via a form. The submitted data is stored in AWS DynamoDB. We use AWS Lambda to process the requests and AWS API Gateway to manage the API endpoints.

### Prerequisites

1. **AWS Account:** Ensure you have an AWS account with appropriate permissions.
2. **Basic Knowledge:** Familiarity with AWS S3, API Gateway, Lambda, DynamoDB, and JavaScript is helpful but not required.

### AWS Services 

We are going to use the following AWS services in this lab.

1. AWS S3 Bucket
2. AWS API Gateway
3. AWS Lambda Function
4. AWS AWS DynamoDB Table
5. IAM Role

### Architectural Diagram 



### Setup Steps

We have divided this Lab into multiple scenarios so that it will be easy to follow and gradually we will reach to the end result.

#### Scenario 1

In this scenario, we are going to upload the static web pages to the AWS S3 bucket and try to access it using AWS S3 URL.

1. Clone this repository to get all the required files in your local machine. You can start with creating a folder and then clone this repo inside it to keep the things at one place.

```
mkdir aws-project

git clone <this repo URL>
```

2. Create AWS S3 bucket and enable the website hosting property

- Go to AWS Management Console, and to the AWS S3 console.
- Create a new bucket or use an existing one.
- Upload all the files available in the website/scenario1 folder.
- Go to permissions tab in bucket and Set the bucket policy to allow public access.
- Go to properties tab in bucket and Configure the bucket for static website hosting. Set index.html as the default document and error.html as error page.

3. Now try to access the static website using the AWS S3 URL from your browser. (you can see the URL in static website property itself). You should be able to see a webpage asking for some of the details.

In this scenario, we just created a webpage and filled in the details, but these details are not stored anywhere. 

#### Scenario 2

Now we are going to store the data filled in the form to a dynamoDB table. This will require to setup API Gateway, Lambda functions and DynamoDB table.

_1. Create DynamoDB Table_
- Go to the AWS DynamoDB console.
- Create a table named "UserDetails" with "UserId" as the partition key.
- Keep all other things as is and create the table.

_2. Create Lambda Function_
- Go to the AWS Lambda console.
- Create a new Lambda function by selecting Author from scratch. 
- Name you function "SaveUserDetails" and select runtime as python 3.9.
- In the permissions, create a new role from AWS Policy templates, give a name to your role and select "Simple microservice permissions" from the templates. 
- Create the function.

_3. Add the Lambda code_ 

- Select and go inside the newly created Lambda function and scroll to the code source option.
- Copy the content from website/scenario2/lambdacode.py and paste it in the lambda_function.py.
- Click on Deploy button to save these changes.

_4. Create API Gateway_

- Go to the AWS API Gateway console.
- Create a new Rest API.
- Create a resource named /user and add a POST method.
- Configure the POST method to use Lambda proxy integration with your Lambda function.
- Add an OPTIONS method for CORS.
- Deploy the API to a stage.

_5. Update the WebPage script_

- Update website/scenario2/script.js file with the correct API Gateway endpoint URL.
- Upload the updated script.js to your S3 bucket.

Once all these steps are done, you can try accessing your S3 bucket URL and save the details again. This time the data would be saved in dynamodb at the backend. you can go to the dynamoDB console and check the entries there.


### Validation

Sometimes, you may face issues while accessing S3 bucket URL and saving the data. We can try to troubleshoot the issues by validating each steps involved in this process.

1. validate if the Lambda code is working fine.

- Go to Lambda console and select your fucntion. 
- Scroll down to the source code and click on test and create a new test event. You can name it anything you like. 
- In the JSON field write the below code
    ```
    {
    "httpMethod": "POST",
    "body": "{\"name\":\"John Doe\", \"hobby\":\"Reading\", \"travelInterest\":\"Mountains\", \"iconicPlace\":\"Grand Canyon\"}"
    }
    ```
- Save the test and run it.
- If you receive a 200 Respose in the execution result, it means the Lambda code is working fine and able to save the data in dynamoDB table. 
- You can also go to the dynamodb table and check the entries there.

2. validate the API Gateway

- Navigate to the API Gateway service in the AWS Management Console.
- Select your API (e.g., UserDetailsAPI).
- In the left pane, click on Resources and select the POST method under the /user resource.
- Click on the Test button.
- In the request body enter below content

    ```
    {
    "name": "John Doe",
    "hobby": "Reading",
    "travelInterest": "Mountains",
    "iconicPlace": "Grand Canyon"
    }
    ```        

- Click on the Test button.
- Check the Response Body and ensure it matches the expected output.





