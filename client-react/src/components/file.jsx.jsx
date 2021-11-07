import { Box, Center } from '@chakra-ui/layout';
import {AddIcon} from '@chakra-ui/icons'
import React, { useState } from 'react';
import './styles.css'


const File = (props) => {
    const { folder, folderId, name, path, type } = props;
    const url = "http://localhost:8080/" + path
    console.log(url)
    return (
        <Box>
        <Box 
            backgroundImage = {url}
            className = 'fileContainer'
            onClick = {() => console.log(props)}
        >
            

        </Box>
        <Center> <p> {name} </p></Center>
        </Box>
    );
}
 
export default File;