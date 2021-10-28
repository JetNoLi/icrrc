import React, { useState } from 'react';
import './styles.css'

const FileBuilder = () => {
    
    const [dir, setDir] = useState({})
    const [files, setFiles] = useState([])

		const select = async () =>{
			
  		const dirHandle = await window.showDirectoryPicker();
			setDir(dirHandle)
			await loadFiles(dirHandle)
			
		}

		const loadFiles = async (dirHandle) =>{
			const handler = dirHandle.values()
			const tempFiles =  [{name: '..'}]

			let count = 0;
			// console.log(tempFiles)
			while (count < 10){
				count++;
				const file = await handler.next()
				// console.log("HELLo")
				if (file.done){
					console.log(tempFiles)
					setFiles([...tempFiles])
					
					break
				}
				tempFiles.push(file.value)
			}

		}

		const dig = (name) =>{
			console.log(name)
		}

		const createFile = async (name) =>{
			// const options = {
			// 	types: [
			// 		{
			// 			description: 'Text Files',
			// 			accept: {
			// 				'text/plain': ['.txt'],
			// 			},
			// 		},
			// 	],
			// };
			// const handle = await window.showSaveFilePicker(options);
			// console.log(handle)
			const child = await dir.getDirectoryHandle('New Dir', {
				create: true
			})

			const innerFile = await child.getFileHandle('File New.txt', {create: true});

			const writable = await innerFile.createWritable();

			const contents = "dummydata that we can fetch from wherever"

			await writable.write(contents)

			writable.close();
			// console.log(handle, "created")
			loadFiles(dir)

		}

		const openFile = async () =>{
			console.log("awe")
		}
    
    return ( 
      <> 
        <div className = 'fileDisplay'>
          {files.map( file =>{
							return(
								<div className = 'fileWide' key = {file.name}>{file.name} </div>
							);
						
          })}
					Exists {files.length}
        </div>
				<button onClick = {select}> Whats up</button>
				<button onClick = {createFile}> Create</button>
      </>
    );

  

    }
 
export default FileBuilder;