# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the build output
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the build output
CMD ["serve", "-s", "build"]
