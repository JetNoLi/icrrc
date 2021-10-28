const determineExpression = (expressions) =>{
  let max = 0
  let result = ""
  
  const keys = Object.keys(expressions)
  
  for (const key of keys){
    const expression = expressions[key]

    if (expression > max) {
      max = expression
      result = key
    } 
  }

  return result
}

const saveEditedImage = (fileName, buffer) =>{
  try{
    fs.createWriteStream(path.resolve(baseDir, fileName)).write(buffer)
  }
  catch(error){
    console.log(error)
  }
  
}

module.exports = {
  determineExpression,
  saveEditedImage
}