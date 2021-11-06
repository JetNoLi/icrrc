const { getAllFiles, getFileById, getFileByPath, moveFileById, moveFileByPath } = require('../controllers/file-controller');
const { folderPath, folderId, filePath, fileId, testFile, testFolder, moveFolder, moveId, createdFolder } = require('./constants');
const { getFolderByPath, getFolderById, getFolderContentsById, getFolderContentsByPath, createFolderById } = require('../controllers/folder-controller');

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

test('Get file by ID', () =>{
	return getFileById(fileId)
		.then( data => {
			expect(data.data())
				.toStrictEqual(testFile)
		})
})


test('Get file by path', () =>{
	return getFileByPath(filePath)
		.then( data =>{
			expect(data.data())
				.toStrictEqual(testFile)
		})
})

test("Move file by ID", () =>{
	const path = moveFolder.path + "test.jpg"
	return moveFileById(fileId, moveFolder.path)
		.then( data =>{
			expect(data)
				.toStrictEqual(path)
		})
});

test("Move file by Path", () =>{
	const path = moveFolder.path + "test.jpg"
	return moveFileByPath(path, folderPath)
		.then( data =>{
			expect(data)
				.toStrictEqual(testFile.path)
		})
});
