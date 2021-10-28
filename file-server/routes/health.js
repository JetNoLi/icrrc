const express = require('express');
const router = express.Router();

/**
 * GET /health
 * @summary Check to ensure the server is running
 * @return {string} 200 - success response
 */
router.get('/', (req, res) =>{
  res.send("Server is Healthy!")  
})

module.exports = router;