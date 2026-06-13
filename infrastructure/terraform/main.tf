# 1. Terraform Settings: Tells Terraform which version to use and where to get plugins
terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Use the latest version 5.x of the AWS provider
    }
  }
}

# 2. Provider Configuration: Tells Terraform we are using AWS and which region
provider "aws" {
  region = "af-south-1" # Cape Town region! (Change to us-east-1 if you prefer, but af-south-1 is great for SA latency)
}

# 3. The Resource: Creating the DynamoDB Table for Players
resource "aws_dynamodb_table" "coastal_kings_players" {
  name         = "coastal-kings-players"
  billing_mode = "PAY_PER_REQUEST" # Great for Free Tier! You only pay for what you use.
  hash_key     = "playerId"        # The primary key (like an ID card number)
  range_key    = "createdAt"       # The sort key (allows us to sort players by date)

  attribute {
    name = "playerId"
    type = "S" # 'S' means String
  }

  attribute {
    name = "createdAt"
    type = "S" # We will store dates as ISO strings (e.g., "2024-06-15T10:00:00Z")
  }

  # Tags help us identify resources in the AWS console
  tags = {
    Environment = "production"
    Project     = "Coastal Kings Academy"
    ManagedBy   = "Terraform"
  }
}