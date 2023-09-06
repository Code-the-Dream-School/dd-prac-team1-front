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
type ModalForNewIngredientProps = {
  isOpen: boolean;
  onClose: () => void;
  handleIngredientAdd: Function;
};

const ModalForNewIngredient = ({
  isOpen,
  onClose,
  handleIngredientAdd
}: ModalForNewIngredientProps) => {
  const handleNewIngredient = (e: any) => {
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(data);
    console.log(dataObj);
    handleIngredientAdd(dataObj);
  };
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      variant="outline"
      isCentered>
      <Box as="form" onSubmit={handleNewIngredient}>
        <ModalOverlay
          bg="transparent"
          backdropFilter="blur(05px) brightness(0.5)"
        />
        <ModalContent>
          <ModalHeader>Add new ingredient</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Center>
              <Input
                size="sm"
                w="100%"
                type="text"
                placeholder="Enter ingredient"
                name="ingredientName"
                defaultValue=""
              />
              <Input
                size="sm"
                m="2"
                w="50%"
                type="number"
                min="0"
                placeholder="Enter amount"
                name="ingredientAmount"
                defaultValue=""
              />
              <Input
                size="sm"
                m="2"
                w="50%"
                type="text"
                placeholder="Choose unit"
                name="ingredientUnit"
                defaultValue=""
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} bg="brandGray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add ingredient</Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
};
export default ModalForNewIngredient;
