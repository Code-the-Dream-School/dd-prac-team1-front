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
      <ModalOverlay bg="transparent" backdropFilter="blur(0.3px)" />
      <ModalContent>
        <ModalHeader>Enter email</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Center>
            <Input
              size="sm"
              w="100%"
              type="email"
              placeholder="Enter email"
              // value={email}
            />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Send email</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalForSendEmail;
