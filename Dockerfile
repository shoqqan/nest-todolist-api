# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
# Copy the rest of the application files
COPY . .


RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD [  "npm", "run", "start:migrate:prod" ]

