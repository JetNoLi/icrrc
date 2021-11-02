import axios from 'axios';

const base = "http://localhost:8080/";

export const getRoot = async () =>{
    const path = '/images';

    const response = await axios.get(base + "folder/?path=_images");
    const folders = response.data;

    console.log(folders);
    return folders;
}
