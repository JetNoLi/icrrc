import React, { useEffect, useState } from 'react';
import {Box, Grid, GridItem, Button} from '@chakra-ui/react'
import { getRoot } from '../api/api';
import File from './file.jsx';
import Add from './add';
import { useDisclosure } from '@chakra-ui/hooks';

const FileContainer = (props) => {
	const [root, setRoot] = "images/"
	const [folders, setFolders] = useState([])
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cols = 8;

	const getFolder = async () =>{
		const contents = await getRoot();
		setFolders([...contents, ...folders])
	}

	const goTo = async (document) =>{
		// Enter new Folder
		if (document.parent === typeof("string")){
			console.log("hello")
		}

		// Load File Modal
	}


	const displayFolders = () =>{
		if (folders.length > 0){

			return (
				[...folders.map( (folder, index) =>{
					index = index 
					const column = index % cols;
					const row = Math.floor(index / cols);
					
					return(
						<GridItem rowStart = {row + 1} colStart = {column + 1} key = {index.toString() + "gridItem" + folder.name}>
							<File {...folder}/>
						</GridItem>
					)
				 
				}), <Add isOpen = {isOpen} onClose = {onClose} onOpen = {onOpen}/>]
			);
		}		

		else{
			return [<Add isOpen = {isOpen} onClose = {onClose} onOpen = {onOpen}/>]
		}
	}

		return ( 
				<Box className = 'fileDisplayContainer'>
						<Button onClick = {getFolder}> Get Folder </Button>
						<Box h = '5vh'/>
						<Grid
							templateColumns = "repeat(8)"
							gap = {4}
						>
							{displayFolders()}
						</Grid>
				</Box>
		);
}
 
export default FileContainer;