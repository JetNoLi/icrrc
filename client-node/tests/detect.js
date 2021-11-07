const detect = require('../../file-server/face/detect');

const result = async () =>{
    const res = await detect('./images/test.jpg')
    console.log(res)
}

result()