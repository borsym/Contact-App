# Contact List Application

Spring Boot backend and a React frontend.

## Prerequisites

- Docker and Docker Compose
- AWS account with S3 access
- Bash shell (for running the add_user.sh script)

## Setup

1. Clone the repository to your local machine.

2. Create a `secret.properties` file in the `backend/src/main/resources/` directory with your AWS credentials:

```
aws.access-key-id=YOUR_ACCESS_KEY
aws.secret-access-key=YOUR_SECRET_KEY
aws.s3.region=YOUR_AWS_REGION
```

3. Build and run the Docker containers:

```
docker-compose up --build
```

4. run the add_user.sh script to add a user and a contact to the database:

```
chmod +x add_user.sh
./add_user.sh
```

5. Open your browser and navigate to `http://localhost:5173` to access the contact list application.

6. Don't forget to refresh the page
