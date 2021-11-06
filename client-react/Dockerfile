# Selected Base Image compatible with React 
FROM node:13.12.0-alpine

# Set Working Directory
WORKDIR /app

# Add Path Specification for Installation of React
ENV PATH /app/node_modules/.bin:$PATH

# Copy Dependencies List
COPY package.json ./

# Install Dependencies
RUN npm install
RUN npm install react-scripts@3.4.1 -g 

# Add the Source Code
COPY . ./

# Start the Application
CMD ["npm", "start"]