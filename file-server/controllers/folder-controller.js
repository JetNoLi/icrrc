const { folderCollection, fileCollection } = require('../firebase');
const { makeFolder } = require('../utils/folder-utils');

// id refers to id of the parent folder
const createFolderById = async (id, name) =>{
	const parentFolder = await getFolderById(id);
	const parentPath = parentFolder.data().path;
	const path = parentPath + "/" + name;

	const folder = {
		parent:id,
		name,
		path
	} 

	makeFolder(path);
	
	await folderCollection.add(folder);

	return folder;
}

const getAllFolders = async () => {
  const folders = await folderCollection.get()

  if (!folders) {
	return null
  }

  return folders.docs
}

const getFolderById = async (id) => {
  const folder = await folderCollection
		.doc(id)
		.get();

	if (!folder){
		return null
	}

	return folder;
}

const getFolderByPath = async (path) => {
  const folders = await folderCollection
		.where("path", "==", path)
		.get();

	const folder = folders.docs ? folders.docs[0] : null;

	console.log(folder)

	if (!folder){
		return null
	}

	return folder;
}

const getFolderContentsById = async (id) => {
	const folderDocs = await folderCollection
		.where('parent', '==', id)
		.get();
	
	const fileDocs = await fileCollection
		.where("folderId", "==", id)
		.get();
	
	if (!folderDocs && !fileDocs){
		return null;
	}

	const folders = folderDocs.docs.map( folder => {
		return { ...folder.data(), id: folder.ref.id }
	})

	const files = fileDocs.docs.map( file => {
		return { ...file.data(), id: file.ref.id }
	})

	return [...folders, ...files];
}

const getFolderContentsByPath = async (path) => {
	const folder = await getFolderByPath(path);

	if (!folder){
		return null;
	}

	const contents = await getFolderContentsById(folder.ref.id);

	return contents;

}

module.exports = {
  getAllFolders,
  getFolderById,
  getFolderContentsById,
  getFolderContentsByPath,
	createFolderById,
	getFolderByPath
}
