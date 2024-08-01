import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserDetails')

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        'Access-Control-Allow-Credentials': 'true'
    }
    
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps('CORS preflight request')
        }

    if event['httpMethod'] == 'POST':
        user_details = json.loads(event['body'])
        user_id = str(uuid.uuid4())
        user_details['UserId'] = user_id
        
        table.put_item(Item=user_details)
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'User details saved successfully!', 'UserId': user_id})
        }
    elif event['httpMethod'] == 'GET':
        user_id = event['queryStringParameters']['UserId']
        
        response = table.get_item(Key={'UserId': user_id})
        
        if 'Item' in response:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(response['Item'])
            }
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'message': 'User not found'})
            }

    return {
        'statusCode': 400,
        'headers': headers,
        'body': json.dumps({'message': 'Unsupported method'})
    }
