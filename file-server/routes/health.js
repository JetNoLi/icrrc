const express = require('express');
const router = express.Router();
const fs = require('fs')

/**
 * GET /health
 * @summary Check to ensure the server is running
 * @return {string} 200 - success response
 */
router.get('/', (req, res) =>{
  res.send("Server is Healthy!")  
})

/**
 * GET /health/filesystem/{path}
 * @summary Check to see directory contents on server
 * @param {string} path.path - path relative to route directory
 * @return {object} 200 - success response
 */
 router.get('/:path', (req, res) =>{
  fs.readdir(req.params.path, (err, files) => {
    if (err) {
      res.status(400)
        .send(err)
    }
    res.send(files)

  });
})

module.exports = router;