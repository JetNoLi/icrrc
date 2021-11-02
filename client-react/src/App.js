import logo from './logo.svg';
import './App.css';
// import FileBuilder from './components/fileBuilder';
import CreateFile from './components/createFile';
import FileContainer from './components/FileContainer'
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (

    <ChakraProvider>
      <FileContainer/>
    </ChakraProvider>
  
  );
}

export default App;
