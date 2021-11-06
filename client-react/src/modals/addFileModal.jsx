import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
		Button
  } from "@chakra-ui/react"

const AddFileModal = ({isOpen, onClose}) => {
    return ( 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder = 'Name'/>
						<Input placeholder = 'Image' type = 'file'/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}
 
export default AddFileModal