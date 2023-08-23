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
type ModalForNewIngredientProps = {
  isOpen: boolean;
  onClose: () => void;
  newIngredientName: string;
  newIngredientAmount: number;
  newIngredientUnit: string;
  handleNewIngredientName: Function;
  handleNewIngredientAmount: Function;
  handleNewIngredientUnit: Function;
  handleIngredientAdd: () => void;
};

const ModalForNewIngredient = ({
  isOpen,
  onClose,
  newIngredientName,
  newIngredientAmount,
  newIngredientUnit,
  handleNewIngredientName,
  handleNewIngredientAmount,
  handleNewIngredientUnit,
  handleIngredientAdd
}: ModalForNewIngredientProps) => {
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
        <ModalHeader>Add new ingredient</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Center>
            <Input
              size="sm"
              w="100%"
              type="text"
              placeholder="Enter ingredient"
              value={newIngredientName}
              onChange={e => {
                handleNewIngredientName(e);
              }}
            />
            <Input
              size="sm"
              m="2"
              w="50%"
              type="number"
              min="0"
              placeholder="Enter amount"
              value={newIngredientAmount}
              onChange={e => {
                handleNewIngredientAmount(e);
              }}
            />
            <Input
              size="sm"
              m="2"
              w="50%"
              type="text"
              placeholder="Choose unit"
              value={newIngredientUnit}
              onChange={e => {
                handleNewIngredientUnit(e);
              }}
            />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleIngredientAdd}>Add ingredient</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalForNewIngredient;
