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