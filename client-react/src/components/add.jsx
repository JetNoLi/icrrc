import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import {AddIcon, Icon} from '@chakra-ui/icons'
// import { useDisclosure } from '@chakra-ui/hooks';
import AddFileModal from '../modals/addFileModal';
import AddFolderModal from '../modals/addFolderModal';
import { Button } from '@chakra-ui/button';


const Add = ({isOpen, onClose, onOpen}) => {
	const [create, setCreate] = useState("");

	console.log("Loading")

	const createFile = () =>{
		setCreate('file');
		onOpen()
	}

	const createFolder = () =>{
		setCreate('folder');
		onOpen()
	}

	if (create === "file"){
		return ( 
			<AddFileModal isOpen = {isOpen} onClose = {onClose} />		
		);
	}
	else if(create === "folder"){
		return( 
			<AddFolderModal isOpen = {isOpen} onClose = {onClose} />
		);
	}
	else if (create === "select"){
		
		return(
			<Box 
        className = 'createContainer'
      >
				<Button onClick = {createFile}> File </Button>
				<Button onClick = {createFolder}> Folder </Button>
      </Box>
		)
	}
	else{
		console.log("Default")
		return(
			<Box 
        className = 'fileContainer'
				onClick = { () => setCreate("select")}
      >
				<AddIcon color = 'grey' boxSize = '4vh'/>
      </Box>
		);
	}

	
}
		
export default Add;
