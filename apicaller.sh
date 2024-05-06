#!/bin/bash

# Path to your output.json file
output_file="/Users/user/Desktop/ASB/output.json"

# Check if the file exists and is not empty
if [[ -s "$output_file" ]]; then
    # Extract keys and values using jq
    keys=$(jq -r  'keys_unsorted | .[]' "$output_file")
    values=$(jq -r 'to_entries | .[].value' "$output_file")
    echo $keys
    echo $values
    # Combine keys and values into key-value pairs
    paste -d' ' <(echo "$keys") <(echo "$values") | while read -r key value; do
        # Print key and value before making the API call
        echo "Key: $key"
        echo "Value: $value"

        # Call the API with key and value in the request body
        curl -X POST "http://127.0.0.1:8081/emailIssues" \
        -H "Content-Type: application/json" \
        -d "{\"id\": \"$key\", \"token\": \"$value\"}" &

        # Wait for 10 seconds before making the next API call
        sleep 20s
    done
else
    echo "Error: File not found or empty - $output_file"
fi