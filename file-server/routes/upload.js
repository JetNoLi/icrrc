const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

//ML Model 
const detect = require('../face/detect');

//Route to upload file
router.post("/", async (req, res) => {
    try{
        if (!req.files){
            res.send({
                status: false,
                message: 'No file'
            });
        }
        const image = req.files.file;

        const path = './images/' + image.name;

        // Store Image
        image.mv(path);
        
        // Detect Face, Gender and Age
        const detectionData = await detect(path);

        // Find Parent Directory Name
        const directories = path.split('/');
        const parentDirectory = directories[directories.length - 2];
        console.log(parentDirectory)

        // Find Id of folder in database
        const folderDocs = await db.collection('folders')
            .where('name', '==', parentDirectory)
            .get()

        console.log(folderDocs)
        console.log(folderDocs.docs)

        const folderId = folderDocs.docs.map( folderDoc => {
            return folderDoc.ref.id;
        })[0];

        const fileData = { 
            name: image.name,
            path,
            detectionData,
            folderId,
            folder: parentDirectory
        }

        const file = await db.collection("files").add(fileData);
        const id = file.id;

        res.send(id);
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
});

module.exports = router;