const {fileCollection, folderCollection} = require('../firebase');
const { moveImage } = require('../utils/file-utils')

const getAllFiles = async () =>{
	const files = await fileCollection.get();

	if (!files){
		return null;
	}

	return files.docs
}

const getFileById = async (id) =>{
	console.log(id)
	const file = await fileCollection
		.doc(id)
		.get();

	return file ? file : null
}

const getFileByPath = async (path) =>{
	const files = await fileCollection
		.where('path' , '==', path)
		.get();
	
	const file = files.docs ? files.docs[0] : null;

	return file;
}

const moveFileById = async (id, newPath) =>{	
	const file = await getFileById(id);

	if (!file){
		return null;
	}

	const fileData = file.data();
	const originalPath = fileData.path;

	// Move file
	const verify = await moveImage(originalPath, newPath);

	if (verify !== newPath){
		return verify
	}

	// Update DB
	// To do update parent folder id
	await file.ref.update({path: oldPath})

	return (newPath)
}

const moveFileByPath = async (path, newPath) =>{
	const file = await getFileByPath(path);

	if (!file){
		return null;
	}

	const fileData = file.data();
	const originalPath = fileData.path;

	// Move file
	const verify = await moveImage(originalPath, newPath);

	if (verify !== newPath){
		return verify
	}

	// Update DB
	// To do update parent folder id
	await file.ref.update({path: oldPath})

	return (newPath)
}


module.exports = {
    getFileById,
    getFileByPath,
    moveFileById,
    moveFileByPath,
		getAllFiles
}