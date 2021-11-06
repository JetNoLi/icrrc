const folderId ="ngUEXLTpXbMxe5HHewLH"
const fileId = "h4JAy3MmLvXqOpNHewDw";

module.exports = {
	folderPath: "images/",
	folderId,
	filePath: "images/test.jpg",
	fileId,
	testFile: {
    name: "test.jpg",
    path: "images/test.jpg",
    detectionData: {
      none: true
    },
    folderId,
    parentDirectory: 'images'
	},
	testFolder: {
		name: 'images',
		parent: "",
		path: 'images/'
	},
	createdFolder:{
		name: 'created',
		parent: folderId,
		path: 'images/created/'
	},
	moveId: '4rDQpH0wUcUPWaeHRHNX',
	moveFolder: {
		name: 'moveTo',
		parent: folderId,
		path: 'images/moveTo/'
	}
}
