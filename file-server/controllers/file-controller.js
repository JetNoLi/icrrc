const {fileCollection, folderCollection} = require('../firebase');
const { moveImage } = require('../utils/file-utils');
const { getFolderByPath } = require('./folder-controller');

const getAllFiles = async () =>{
	const files = await fileCollection.get();

	if (!files){
		return null;
	}

	return files.docs
}

const getFileById = async (id) =>{
	// console.log(id)
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

	const folder = await getFolderByPath(newPath);

	if (!folder){
		return null
	}

	// Move file
	const verify = await moveImage(originalPath, newPath + fileData.name);

	if (verify !== newPath + fileData.name){
		return verify
	}

	// Update DB
	await file.ref.update({path: verify, folderId: folder.ref.id, parentDirectory: folder.data().name})

	return (verify)
}

const moveFileByPath = async (path, newPath) =>{
	const file = await getFileByPath(path);

	if (!file){
		return null;
	}

	const fileData = file.data();
	const originalPath = fileData.path;

	const folder = await getFolderByPath(newPath);

	if (!folder){
		return null
	}


	// Move file
	const verify = await moveImage(originalPath, newPath + fileData.name);

	if (verify !== newPath + fileData.name){
		return verify
	}

	// Update DB
	await file.ref.update({path: verify, folderId: folder.ref.id, parentDirectory: folder.data().name})

	return (verify)
}


module.exports = {
    getFileById,
    getFileByPath,
    moveFileById,
    moveFileByPath,
	getAllFiles
}