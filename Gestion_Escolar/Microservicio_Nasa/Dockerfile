# Using a Node.js base image
FROM node:14

WORKDIR /usr/src/app

# Copy the package.json file and install the dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Expose the port your application runs on
EXPOSE 3002

# Command to run the application when the container starts up
CMD ["node", "index.js"]