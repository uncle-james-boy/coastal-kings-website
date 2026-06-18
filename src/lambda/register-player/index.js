// src/lambda/register-player/index.js

// We import the AWS SDK v3 (built into the Node.js 18+ Lambda runtime)
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const crypto = require("crypto");

// Initialize the client
const client = new DynamoDBClient({ region: "af-south-1" });

exports.handler = async (event) => {
    console.log("Received registration request:", event);

    try {
        // 1. Parse the data coming from the website
        const body = JSON.parse(event.body);
        
        // 2. Generate a unique ID for the player
        const playerId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        // 3. Prepare the data for DynamoDB
        const params = {
            TableName: "coastal-kings-players", // The table we built earlier!
            Item: {
                playerId: { S: playerId },       // S means String
                createdAt: { S: timestamp },
                playerName: { S: body.playerName || "Unknown" },
                parentEmail: { S: body.parentEmail || "unknown@test.com" },
                status: { S: "PENDING_REVIEW" }
            }
        };

        // 4. Save to Database
        await client.send(new PutItemCommand(params));

        // 5. Return Success
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Player registered successfully!", id: playerId })
        };

    } catch (error) {
        console.error("Error saving to DynamoDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to register player." })
        };
    }
};