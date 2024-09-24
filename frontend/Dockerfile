# Use the official Node.js image as the base
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
ARG SUPPRESS_TYPESCRIPT_ERRORS
RUN if [ "$SUPPRESS_TYPESCRIPT_ERRORS" = "true" ]; then \
      yarn build-docker; \
    else \
      yarn build; \
    fi

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy built assets from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that the server will run on
EXPOSE 80
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
