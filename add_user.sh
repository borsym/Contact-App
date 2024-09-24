#!/bin/bash

# Define the API endpoints
USER_API_URL="http://localhost:8080/api/v1/users"
CONTACT_API_URL="http://localhost:8080/api/v1/contacts/users"

# Define the path to the image
USER_IMAGE_PATH="backend/src/main/resources/images/img1.jpeg"
CONTACT_IMAGE_PATH="backend/src/main/resources/images/img2.jpeg"

# Define the user data in JSON format
USER_DATA=$(cat <<EOF
{
  "name": "Test",
  "email": "test@example.com",
  "phoneNumber": "1234567890",
  "password": "password"
}
EOF
)

# Write the user data to a temporary file
USER_DATA_FILE=$(mktemp)
echo "$USER_DATA" > "$USER_DATA_FILE"

# Use curl to send a POST request with the user data and image file
USER_RESPONSE=$(curl -s -X POST "$USER_API_URL" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@$USER_IMAGE_PATH" \
  -F "user=@$USER_DATA_FILE;type=application/json")

# Extract the userId from the response
USER_ID=$(echo $USER_RESPONSE | grep -o '"id":"[^"]*' | grep -o '[^"]*$')

# Clean up the temporary file
rm "$USER_DATA_FILE"

echo "User added successfully with ID: $USER_ID"

# Save the USER_ID to a shared volume file for use in the frontend

# Define the contact data in JSON format
CONTACT_DATA=$(cat <<EOF
{
  "name": "Test Elek",
  "email": "test.elek@example.com",
  "phoneNumber": "0987654321"
}
EOF
)

# Write the contact data to a temporary file
CONTACT_DATA_FILE=$(mktemp)
echo "$CONTACT_DATA" > "$CONTACT_DATA_FILE"

# Use curl to send a POST request with the contact data and image file
curl -X POST "$CONTACT_API_URL/$USER_ID" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@$CONTACT_IMAGE_PATH" \
  -F "contact=@$CONTACT_DATA_FILE;type=application/json"

# Clean up the temporary file
rm "$CONTACT_DATA_FILE"

echo "User and contact added successfully"

