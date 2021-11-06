const { getFolderByPath, getFolderById, getFolderContentsById, getFolderContentsByPath, createFolderById } = require('../controllers/folder-controller');
const { folderPath, folderId, moveFolder, moveId, fileId, testFile, testFolder, createdFolder } = require('./constants');

test('Get Folder by ID', () =>{
	return getFolderById(folderId)
		.then( data =>{
			expect(data.data())
				.toStrictEqual(testFolder)
		})
})

test('Get Folder by Path', () =>{
	return getFolderByPath(folderPath)
		.then( data =>{
			expect(data.data())
				.toStrictEqual(testFolder)
		})
})

test('Get Folder Contents By ID', () =>{
	return getFolderContentsById(folderId)
		.then( data =>{
			expect(data)
				.toStrictEqual([{...moveFolder, id: moveId}, {...testFile, id: fileId}, ])
		})
})

test('Get Folder Contents By Path', () =>{
	return getFolderContentsByPath(folderPath)
		.then( data => {
			expect(data)
				.toStrictEqual([ {...moveFolder, id: moveId}, {...testFile, id: fileId}])
		})
})

test('Create Folder', () =>{
	return createFolderById(folderId, "created")
		.then( data =>{
			expect(data)
				.toStrictEqual(createdFolder)
		})
})