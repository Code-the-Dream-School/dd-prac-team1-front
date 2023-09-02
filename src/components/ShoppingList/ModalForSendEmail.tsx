import React from "react";
import {
  Box,
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
  share: Function;
  onClose: () => void;
};

const ModalForSendEmail = ({
  isOpen,
  share,
  onClose
}: ModalForSendEmailProps) => {
  const handleShare = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const emailObj = Object.fromEntries(data.entries());
    console.log(data);
    share(emailObj.email);
  };
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      variant="outline"
      isCentered>
      <Box as="form" onSubmit={handleShare}>
        <ModalOverlay
          bg="transparent"
          backdropFilter="blur(05px) brightness(0.5)"
        />
        <ModalContent>
          <ModalHeader>Enter email</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Center>
              <Input
                size="sm"
                w="100%"
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button mr="3" bg="brandGray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={onClose}>
              Send email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
};
export default ModalForSendEmail;
