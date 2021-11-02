// setup environment variables
require('dotenv').config();

//imports
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerSetup = require('./swagger-setup.js');
const swaggerExpress = require('express-jsdoc-swagger');

//route handlers
const health = require('./routes/health');
const upload = require('./routes/upload');
const download = require('./routes/download');
const file = require('./routes/file');
const folder = require('./routes/folder');

// declare server instance
const app = express();

// setup swagger documentation
swaggerExpress(app)(swaggerSetup);

// load middleware
app.use(cors()); // Allow for communication between locally deployed instances
app.use(fileUpload({createParentPath: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json()); //Allow for JSON parsing on api requests

// route handlers
app.use('/health', health)
app.use('/upload', upload);
app.use('/download', download);
app.use('/file', file);
app.use('/folder', folder);

// static route for serving images
app.use("/images", express.static(path.join(__dirname, 'images')));

// health routes
app.get("/health", (req, res) =>{
    res.send("Server is Healthy");
})

// start server
app.listen(process.env.PORT || 8080 , () =>{
    console.log("Server is running on port", process.env.PORT + "...");
})