# Maven image to build the app
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and the source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests && ls -l target

# JDK base image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the packaged JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# Set the entry point for the application
ENTRYPOINT ["sh", "-c", "ls -l && java -jar app.jar"]


