const detect = require('../face/detect');

const run = async () =>{
    console.log(await detect('../images/jet.jpg'));
}

run()