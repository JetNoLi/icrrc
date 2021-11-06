# Select Runtime Environment Base Image
FROM node:14

# Set Working Directory for Container
WORKDIR /app

# Copy Dependencies list
COPY package.json ./
# Install Dependencies
RUN npm install

# Add Source Code to Working Directory
COPY . .

# Expose the application on port 8080 of
# the system hosting the container
EXPOSE 8080

# Start the Server
CMD ["node", "index.js"]