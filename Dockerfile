# Use the official Node.js runtime as a parent image
FROM node:14-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app
RUN npm run build

# Serve the built app using a static server
CMD ["npm", "start"]
