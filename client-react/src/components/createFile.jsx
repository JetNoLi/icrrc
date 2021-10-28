import React, { useState, useRef } from 'react';
import axios from 'axios'

const CreateFile = () => {
    const [faces,setFaces] = useState([])
    const ref = useRef();

    const apiCall = async () =>{
        const formData = fileHandle()
        const response = await axios.post("http://192.168.1.40:8080/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, 
            responseType: 'json',

            data: {
                name: "test.png"
            }
        }).then( res => {
            // setText(res.data.faceData[0].toString())
            setFaces(res.data)
        });

    }

    const fileHandle = () =>{
        const file = ref.current.files[0];
        const formData = new FormData();
        formData.append('file', file)
        return formData;
    }

    return ( 
        <>
            <button onClick = { apiCall }> Click Me </button>
            <input ref = {ref} type='file'></input>
            {faces}
        </>
    );
}
 
export default CreateFile;