const fs = require('fs');

const makeFolder = (path) =>{
    if (!fs.existsSync(path)){
        fs.mkdirSync(path)
    }
}

module.exports = {
    makeFolder
}