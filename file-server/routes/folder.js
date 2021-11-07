const express = require('express')
const { getAllFolders, getFolderById, getFolderByPath, getFolderContentsByPath, getFolderContentsById, createFolderById } = require('../controllers/folder-controller')
const { folderCollection } = require('../firebase')
const { resolvePath } = require('../utils/file-utils')
const router = express.Router()

/**
 * GET /folder
 * @summary route to get all folders or by path query param
 * @tags Folder
 * @param {string} path.query - path to folder wrt. root directory, use _ to denote /
 * @param {boolean} contents.query - true indicates to include folder contents, only relevant if path query param
 * @return {array<object> || object} 200 -  successs response
 */
router.get('/', async (req, res) => {
  const path = resolvePath(req.query.path);

  // get all folders
  if (!path) {
    const folders = (await getAllFolders()).map( folder => {
      return {
        ...folder.data(),
        id: folder.ref.id
      }
    })
    res.send(folders)
		.end()
  }

	if (req.query.contents){
		const folder =  await getFolderContentsByPath(path);

		if (!folder){
			res.status(400)
				.send("Error: Folder not Found")
				.end()
		}

		res.send(folder)
			.end()
	}


	const folder = await getFolderByPath(path)

	if (!folder){
		res.status(400)
			.send("Error: Folder not Found")
			.end()
	}

	res.send({...folder.data(), id: folder.ref.id})
});

/**
 * GET /folder/{id}
 * @summary route to get folder by id
 * @tags Folder
 * @param {string} id.path - database Id
 * @param {boolean} contents.query - include folder content
 * @return {array<object> || object} 200 - successs response
 */
router.get('/:id', async (req, res) =>{
	if (req.query.contents){
		const folder = await getFolderById(req.params.id);
	}

	const contents = await getFolderContentsById(req.params.id);
	
	if (!contents){
		res.status(400)
			.send("Error: File not found")
			.end()
	}

	res.send(contents)
});

/**
 * POST /folder/{folderName}
 * @summary route to create a folder in a given directory by the path
 * @tags Folder
 * @param {string} path.query - path to where folder should be created, use _ to denote /
 * @param {string} folderName.path - name of new folder
 * @param {string} id.query - id of the folder to create the new folder in
 * @return {object} 200 - success response
 */
router.post('/:folderName', async (req, res) =>{
	if (req.query.id){
		const mkdir = await createFolderById(req.query.id);
		if (!mkdir){
			res.status(400)
				.send("Error: Creating Folder")
		}

		res.send(mkdir)
	}

	const path = resolvePath(req.query.path);

	const parent = await getFolderByPath(path);

	const mkdir = await createFolderById(parent.ref.id);
	
	if (!mkdir){
		res.status(400)
			.send("Error: Creating Folder")
			.end()
	}

	res.send(mkdir)
})

module.exports = router;