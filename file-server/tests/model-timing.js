const detect = require('../face/detect');

const result = async () =>{
    try{
        const res = await detect('./images/test.jpg')
        console.log(res)
    }  
    catch(error){
        console.log(error)
    } 
    
}

result()