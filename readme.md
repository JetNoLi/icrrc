# ICRRC: Image Routing and Recognition Cloud

## Overview
The Image Categorization Routing and Recognition Cloud, is a framework for Developing Applications which utilize cloud storage and want the images uploaded to their storage repository to undergo Machine Learning processing. This repository serves as a representation of the client-server interaction of the initial (MVP) version of the ICRRC system, with the server being represented by the file server and the 2 client applications, offering insight to how clients might make use of the framework.

## Built for Redevelopment

This Framework is intended to be reused with different Machine Learning Algorithms. The c

## Instructions To Run
To start the ICRRC file-server we need to first connect it to a database and then we can either deploy it (Using your server/cloud service provider of choice), or it can be run locally using the DockerFile provided (build and run instructions provided Main ICRRC section below). 

To connect to the database create a Firestore database (First create a firebase project by navigating to firebase, signing up and following the on screen instructions. Once you have created your project, navigate to Firestore on the left hand navigation menu and click the Create button). Add the service account JSON file to the root director of the ICRRC project.

Each of the directories (client-node, client-react and file-server) are runnable files. Instructions to run each is found below. Note: the client files serve as templates for use in further application specific development (i.e. users of the framework). 
### Main ICRRC File Server
Create the Docker Image using docker build
Run the Container from the docker image using docker run (remembering to map the Container port to a port on the local system using the -p flag)

### React Client
Can be run locally using the docker file (Same steps as above), or as if in development by first running npm or yarn install in the directory and then calling yarn or npm start.

### Node Client
index.js contains example API requests for downloading a file, checking the health status of the server, accessing a file through the database and statically accessing an image. These can be imported into a .js file (using require syntax in a Node project or import syntax using browser based JS) and run locally (as a node client) using:

    node filename.js

## How To Develop a unique ICRRC instance

As mentioned the framework is designed with redevelopment in mind. Thus in the same way the client programs serve as a template, the file-server is designed modularly for reuse, with different ML algorithms, further development or integration with FaaS through Firebase Functions

