# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]
