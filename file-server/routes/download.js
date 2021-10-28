const express = require('express');
const router = express.Router();

//Route to download
router.get("/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    try{
        if (!fileName){
            res.send({
                status: false,
                message: 'No file name'
            });
        }

        res.download(`./images/${fileName}`);
        res.status(200);
    }
    catch(error){
        res.send(error)
    }
});

module.exports = router;