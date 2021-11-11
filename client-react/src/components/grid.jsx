import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import File from './file.jsx';
import Add from './add.jsx';

import './styles.css'

const isAdd = (input) =>{
    if (input === "add"){
        console.log("YEEEEEES")
        return true
    }
    return false;
}

const Grid = (props) => {
    let {contents} = props
    contents = [...contents, "add"]

    const createGrid = () =>{
        const len = contents.length;
        const cols = 4;
        const rows = Math.ceil(len/cols);
        const lastRowSize = len % cols === 0 ? len : len % cols;

        const display = [];

        for (let i = 0; i < len; i++){
            
            const isLastRow =  i >= rows -1;

            if ((i) % cols === 0 ){
                console.log("IT is i", i)
                const row = []
                const rowIndex = Math.floor(i/cols)
                if (!isLastRow){
                    for (let j = 0; j < cols; j++){
                        const item = contents[rowIndex*cols + j]
                        console.log(item, rowIndex*cols + j)
                        row.push(<Box w = '2vw'/>)
                        row.push(!isAdd(item) ? <File {...item} key = {(j+1)*(i+1)} /> : <Add/>)
                        row.push(<Box w = '2vw'/>)
                    }
                }
                else{
                    console.log("last row")
                    for (let j = 0; j < lastRowSize; j++){
                        console.log(i, j)
                        const item = contents[rowIndex*cols + j]
                        console.log(item, rowIndex*cols + j)
                        row.push(<Box w = '2vw'/>)
                        row.push(!isAdd(item) ? <File {...item} key = {(j+1)*(i+1)} /> : <Add/>)
                        row.push(<Box w = '2vw'/>)
                    }
                }
                console.log(row)
                display.push( 
                    <Box className = 'gridRow' key = {i + "gridRow"}>
                        {row.map( col => col)}
                    </Box>
                )
                
            }
        }

        return (
            <Box className = 'grid'>
                {display.map( row => row )}
            </Box>
        )

    }

    return ( 
        createGrid()
    );
}
 
export default Grid;