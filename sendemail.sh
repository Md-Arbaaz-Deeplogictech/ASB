#!/bin/bash

send_email() {
    local email=$1
    local token=$2

    echo "Sending email to: $email, Token: $token"  # Add logging
    # Call API using curl with request body only
    curl -s -X POST -H "Content-Type: application/json" -d "{\"email\": \"$email\", \"token\": \"$token\"}" http://127.0.0.1:8081/emailIssues
    # echo "API Response: $response"  # Log API response
}

# Check if output.json exists in the same directory
if [ ! -f "output.json" ]; then
    echo "Error: output.json file not found"
    exit 1
fi

# Read and process JSON data
json=$(cat output.json)
echo "JSON Data: $json"  # Log JSON data
echo "$json" | jq -r 'to_entries[] | "\(.value) \(.key)"' | while read -r token email; do
    echo "Processing: Email: $email, Token: $token"  # Log processing of each email and token
    # Call send_email function with email and token
    send_email "$email" "$token"
done
