const express = require('express');
const router = express.Router();
const {fileCollection, folderCollection} = require('../firebase')
const {
	getAllFiles,
	getFileById,
	getFileByPath,
	moveFileById,
	moveFileByPath,
} = require('../controllers/file-controller');
const { resolvePath } = require('../utils/file-utils');

/**
* GET /file
* @summary get all files or by path
* @tags File
* @param {string} path.query - path where file is located.
* @return {object} 200 - success response
*/
router.get('/', async (req, res) =>{
	// const file = await getFileById(req.params.id);
	const path = resolvePath(req.query.path)

	if (path){
		const file = await getFileByPath(path);

		if (!file){
			res.status(400)
				.send("Error: File not found")
				.end()
		}

		res.send({...file.data(), id: file.ref.id})
			.end()
		return;
	}

	const files = (await getAllFiles()).map( file =>{
		return {
			...file.data(),
			id: file.ref.id,
		}
	}); 

	if (!files){
		res.status(400)
			.send("Error: Something went wrong")
			.end()
	}

	res.send(files)

});

/**
* GET /file/{id}
* @summary get file by database ID i.e. firebase document ID
* @tags File
* @param {string} id.path - database ID 
* @return {object} 200 - success response
*/
router.get('/:id', async (req, res) =>{
	const file = await getFileById(req.params.id);

	console.log(file, "HERE", file.data())

	if (!file){
		res.status(400)
			.send("Error, file not found")
			.end()
	}
	
	res.send({...file.data(), id: file.ref.id})
});


/**
 * PUT /file/{id}
 * @summary Move file given by firebase id to path specified in query parameter relative to root directory
 * @tags File
 * @param {string} id.path - database ID 
 * @param {string} path.query.required - new path to move file to use _ to denote slashes
 * @return {string} 200 - success response
 */
router.put('/:id', async (req, res) =>{
	const path = resolvePath(req.query.path)
	const newPath = await moveFileById(req.params.id, path);

	if (newPath === req.query.path){
		res.send(newPath)
			.end()
	}

	res.status(400)
		.send("Move was unsuccessful", newPath);
})

/**
 * PUT /file
 * @summary Move file given by original path to path specified in query parameter relative to root directory
 * @tags File
 * @param {string} oldPath.query - database ID 
 * @param {string} newPath.query - new path to move file to
 * @return {string} 200 - success response
 */
 router.put('/', async (req, res) =>{
	const oldPath = resolvePath(req.query.oldPath)
	const path = resolvePath(req.query.newPath)
	const newPath = await moveFileByPath(oldPath, path);

	if (newPath === path){
		res.send(newPath)
			.end()
	}

	res.status(400)
		.send("Move was unsuccessful", newPath);
})


/**
 * DELETE /file/{id}
 * @summary Delete File by database ID
 * @tags File
 * @param {string} id.path - database ID 
 * @return {object} 200 - success response
 */
router.delete('/:id', async (req, res) =>{
	const file = await fileCollection
		.doc(req.params.id)
  	.get();

	if (!file){
		res.status(400)
			.send("Error, file not found")
			.end()
	}

	await file.ref.delete();

	res.send({...file.data(), id: file.ref.id});
})

/**
 * DELETE /file
 * @summary Delete File by path relative to root directory
 * @tags File
 * @param {string} path.query - path relative to root directory use _ to denote /
 * @return {object} 200 - success response
 */
router.delete('/', async (req, res) =>{
	const path = resolvePath(req.query.path)
	const file = await getFileByPath(path);

	if (!file){
		res.status(400)
			.send("Error, file not found")
			.end()
	}

	await file.ref.delete();

	res.send({...file.data(), id: file.ref.id})
})

module.exports = router;