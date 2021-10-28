const axios = require('axios');
const path = require('path');
const fs = require('fs');

const url = "http://localhost:8080";

const download = async () =>{
    const filePath = path.resolve(__dirname, 'images', 'test.png');
    const writer = fs.createWriteStream(filePath);

    try{
        const file = await axios.get("http://localhost:8080/download/test.png", {
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
        console.log(response.data);
    }
    catch(error){
        console.log(error)
    }
}

download().then( () => console.log('completed'))
    .catch( error => console.log(error, "problem"));
health().then( () => console.log('completed'));