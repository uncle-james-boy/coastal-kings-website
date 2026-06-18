# ==========================================
# 1. TERRAFORM SETTINGS & PROVIDERS
# ==========================================
terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    # NEW: Added the 'archive' provider so Terraform can zip our code
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4.0"
    }
  }
}

# Tells Terraform we are using AWS and which region
provider "aws" {
  region = "af-south-1" # Cape Town region!
}

# ==========================================
# 2. DYNAMODB TABLE (The Filing Cabinet)
# ==========================================
resource "aws_dynamodb_table" "coastal_kings_players" {
  name         = "coastal-kings-players"
  billing_mode = "PAY_PER_REQUEST" # Great for Free Tier!
  hash_key     = "playerId"        # The primary key
  range_key    = "createdAt"       # The sort key

  attribute {
    name = "playerId"
    type = "S" # 'S' means String
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  tags = {
    Environment = "production"
    Project     = "Coastal Kings Academy"
    ManagedBy   = "Terraform"
  }
}

# ==========================================
# 3. LAMBDA FUNCTION (The Waiter)
# ==========================================

# Step A: Zip the Lambda Code automatically
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../src/lambda/register-player" # Path to your code
  output_path = "${path.module}/lambda.zip"                       # Where to save the zip
}

# Step B: Create the IAM Role (The ID Badge)
resource "aws_iam_role" "lambda_role" {
  name = "coastal-kings-lambda-role"

  # This policy allows Lambda to "assume" this role
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Step C: Attach Permissions to the Role (The Keys to the Cabinet)
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

# Give it permission to write logs to CloudWatch (so we can debug!)
resource "aws_iam_role_policy_attachment" "lambda_logging_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Step D: Create the actual Lambda Function
resource "aws_lambda_function" "register_player" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "coastal-kings-register-player"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler" # Filename.functionName
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs18.x"

  environment {
    variables = {
      TABLE_NAME = "coastal-kings-players"
    }
  }

  tags = {
    Project = "Coastal Kings Academy"
  }
}

# ==========================================
# 4. API GATEWAY (The Phone Line)
# ==========================================

# Step A: Create the HTTP API
resource "aws_apigatewayv2_api" "coastal_kings_api" {
  name          = "coastal-kings-api"
  protocol_type = "HTTP" # Modern, cheaper, and faster than REST
  
  cors_configuration {
    allow_origins = ["*"] # In production, change this to my actual Vercel domain!
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

# Step B: Create the Deployment Stage (The "Live" environment)
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.coastal_kings_api.id
  name        = "$default"
  auto_deploy = true # Automatically deploys when I make changes
}

# Step C: Connect API Gateway to Lambda (The Integration)
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.coastal_kings_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.register_player.invoke_arn
  payload_format_version = "2.0"
}

# Step D: Create the Route (The specific "Phone Number")
resource "aws_apigatewayv2_route" "register_route" {
  api_id    = aws_apigatewayv2_api.coastal_kings_api.id
  route_key = "POST /register" # When someone POSTs to /register...
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}" # ...send it to this integration
}

# Step E: Give API Gateway permission to call Lambda (CRITICAL!)
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.register_player.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.coastal_kings_api.execution_arn}/*/*"
}

# Step F: Output the URL so I can copy it easily!
output "api_gateway_url" {
  value       = "${aws_apigatewayv2_api.coastal_kings_api.api_endpoint}/register"
  description = "The public URL to send registration requests to."
}