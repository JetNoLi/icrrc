const execute = async (asyncFunc, args) =>{
    try{
        const response = await asyncFunc(args);
        return response
    }
    catch(error){
        console.log(error);
        return(error)
    }
}