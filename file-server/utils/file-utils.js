const fs = require('fs');

const moveImage = (oldPath, newPath) =>{
  return new Promise( (resolve, reject) =>{
  	// By renaming a file with an entirely new path, we move it
    fs.rename(oldPath, newPath, (err) => {
    	if (err) {
        reject(err)
    	}
			resolve(newPath)
    })
  });
} 

const resolvePath = (formattedPath) =>{
  const path = formattedPath.toString();

  if (typeof(path) === typeof("hello")){
    return path.replace(/_/g, "/")
  }

  return null;
}

module.exports = {
	moveImage,
  resolvePath
}