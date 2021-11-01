const express = require('express');
const router = express.Router();
const {fileCollection, folderCollection} = require('../firebase')
const {
	getFileById,
	getFileByPath,
	moveFileById,
	moveFileByPath,
	deleteFileById,
	deleteFileByPath
} = require('../controllers/file-controller')

/**
* GET /file/:id
* @summary get file by database ID i.e. firebase document ID
* @return {string} 200 - success response
*/
router.get('/:id', async (req, res) =>{
	const file = await getFileById(req.params.id);

	if (!file){
		res.status(400)
			.send("Error, file not found")
	}
	
	res.send(file.data())
});

/**
 * GET /file/path/:path
 * @summary get file by path relative to the root directory
 * @return {string} 200 - success response
 */
router.get('/path/:path', async (req, res) =>{
	const files = await fileCollection
		.where('path' , '==', req.params.path)
		.get();
	
	const file = files.docs ? files.docs[0] : undefined;

	if (!file){
		res.status(400)
			.send("Error, file not found")
	}

	res.send(file.data());
})

router.put('/move/:id', async (req, res) =>{

})

router.delete('/:id', async (req, res) =>{
	const file = await fileCollection
		.doc(req.params.id)
  	.get();

	if (!file){
		res.status(400)
			.send("Error, file not found")
	}

	await file.ref.delete();

	res.send(file.data())
})

router.delete('/path/:path', async (req, res) =>{
	const files = await fileCollection
		.where('path' , '==', req.params.path)
		.get();
	
	const file = files.docs ? files.docs[0] : undefined;

	if (!file){
		res.status(400)
			.send("Error, file not found")
	}

	await file.ref.delete();

	res.send(file.data())
})

module.exports = router;