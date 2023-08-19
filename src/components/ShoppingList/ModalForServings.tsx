import React from "react";
import {
  Button,
  Input,
  Text,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { SavedRecipe } from "../../utils/types";
type ModalForServingsProps = {
  isOpen: boolean;
  onClose: () => void;
  value: number;
  SaveIngredientsToShoppingList: Function;
  valueOfServings: Function;
  // setRecipe: Function;
  // recipe: SavedRecipe;
  // setServingSize: Function;
};

const ModalForServings = ({
  isOpen,
  onClose,
  value,
  SaveIngredientsToShoppingList,
  // recipe,
  valueOfServings
}: // setServingSize,
// setRecipe
ModalForServingsProps) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      variant="outline"
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adjust serving size</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Center>
            <Input
              w="20"
              type="number"
              min="0"
              value={value}
              onChange={e => {
                valueOfServings(e);
              }}
            />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={SaveIngredientsToShoppingList}>
            Add to Shopping List
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalForServings;
