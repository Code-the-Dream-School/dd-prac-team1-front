import React from "react";
import {
  Button,
  Input,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
type ModalForSendEmailProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalForSendEmail = ({ isOpen, onClose }: ModalForSendEmailProps) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      variant="outline"
      isCentered>
      <ModalOverlay
        bg="transparent"
        backdropFilter="blur(05px) brightness(0.5)"
      />
      <ModalContent>
        <ModalHeader>Enter email</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Center>
            <Input size="sm" w="100%" type="email" placeholder="Enter email" />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" bg="brandGray" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Send email</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalForSendEmail;
