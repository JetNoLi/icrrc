import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import './styles.css'


const File = (props) => {
    const { folder, folderId, name, path } = props;

    return (
        <Box 
            className = 'fileContainer'
            onClick = {() => console.log(props)}
        >
            <p>{name}</p>
        </Box>
    );
}
 
export default File;