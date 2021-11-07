const axios = require('axios');
const path = require('path');
const fs = require('fs');

const url = "http://34.125.47.90:8080";

const download = async () =>{
    const filePath = path.resolve(__dirname, 'images', 'test.jpg');
    const writer = fs.createWriteStream(filePath);

    try{
        const file = await axios.get(url + "/download/test.jpg", {
            responseType: 'stream'
        });

        file.data.pipe(writer);

        return new Promise( (resolve,reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
    catch(error){
        console.log(error);
    }

}

const health = async () =>{
    try{
        const response = await axios.get(url + '/health');
    }
    catch(error){
        console.log(error)
    }
}

const getFile = async () =>{
    try{
        const response = await axios.get(url + '/file?path=images_test.jpg');
    }
    catch(error){
        console.log(error)
    }
}

const staticAccess = async () =>{
    try{
        const response = await axios.get(url + '/images/test.jpg')
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {health, download, getFile, staticAccess}