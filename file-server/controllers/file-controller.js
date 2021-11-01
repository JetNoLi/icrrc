const {fileCollection, folderCollection} = require('../firebase');
const { moveImage } = require('../utils/file-utils')

const getFileById = async (id) =>{
	const file = await fileCollection
		.doc(req.params.id)
		.get();

	return file ? file : null
}

const getFileByPath = async (path) =>{
	const files = await fileCollection
		.where('path' , '==', req.params.path)
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
		throw verify;
	}

	// Update DB
	// To do update parent folder id
	await file.ref.update({path: oldPath})

	return (newPath)
}

const moveFileByPath = async (path) =>{

}

const deleteFileById = async (id) =>{

}

const deleteFileByPath = async (path) =>{

}

module.exports = {
    getFileById,
    getFileByPath,
    moveFileById,
    moveFileByPath,
    deleteFileById,
    deleteFileByPath
}