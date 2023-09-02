import React from "react";
import {
  Button,
  Box,
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
type ModalForServingsProps = {
  isOpen: boolean;
  onClose: () => void;
  value: number;
  // saveIngredientsToShoppingList: Function;
  valueOfServings: Function;
  sendIngredients: Function;
};

const ModalForServings = ({
  isOpen,
  onClose,
  value,
  // saveIngredientsToShoppingList,
  valueOfServings,
  sendIngredients
}: ModalForServingsProps) => {
  const handleServingSize = (e: any) => {
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(data);
    console.log(dataObj);
    // valueOfServings(dataObj.ingredientAmount);
    // saveIngredientsToShoppingList();
    sendIngredients(dataObj.ingredientAmount);
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      variant="outline"
      isCentered>
      <Box as="form" onSubmit={handleServingSize}>
        <ModalOverlay
          bg="transparent"
          backdropFilter="blur(05px) brightness(0.5)"
        />
        <ModalContent>
          <ModalHeader>Adjust serving size</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Input
                w="20"
                type="number"
                min="0"
                name="ingredientAmount"
                defaultValue={value}
                // value=
                // onChange={e => {
                //   valueOfServings(e);
                // }}
              />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button mr="3" bg="brandGray" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              //  onClick={() => saveIngredientsToShoppingList()}
            >
              Add to Shopping List
            </Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
};
export default ModalForServings;
