import React, { useEffect, useState } from 'react';
import {Box, Grid, GridItem} from '@chakra-ui/react'
import { getRoot } from '../api/api';
import File from './file.jsx';

const FileContainer = (props) => {

    const [folders, setFolders] = useState([])

    useEffect( async () => {
        const root = await getRoot();
        setFolders(root)

    }, [])

    return ( 
        <Box>
            <Grid
                templateRows = "repeat(8,1fr)"
                templateColumns = "repeat(3, 1f"
            >
                {folders.map( folder => <File {...folder} />)}
                
            </Grid>
        </Box>
    );
}
 
export default FileContainer;