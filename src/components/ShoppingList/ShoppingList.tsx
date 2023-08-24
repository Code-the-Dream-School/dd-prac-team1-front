import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { GrAdd, GrClose, GrDown } from "react-icons/gr";
import { TfiPrinter } from "react-icons/tfi";
import { getIngredientsFromShoppingList } from "../../utils/fetchData";
import { SavedIngredient } from "../../utils/types";
import ModalForNewIngredient from "./ModalForNewIngredient";
import ModalForSendEmail from "./ModalForSendEmail";
import ShoppingListIngredient from "./ShoppingListIngredient";

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([]);
  const [checkedIds, setCheckedIds] = useState<Array<string>>([]);

  const {
    isOpen: isOpenChangedIngredient,
    onOpen: onOpenChangedIngredient,
    onClose: onCloseChangedIngredient
  } = useDisclosure();

  const {
    isOpen: isOpenSendEmail,
    onOpen: onOpenSendEmail,
    onClose: onCloseSendEmail
  } = useDisclosure();
  useEffect(() => {
    getIngredientsFromShoppingList()
      .then(response => {
        console.log(response);
        setIngredients(response.data.ingredients);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIngredientAdd = (newIngredient: SavedIngredient) => {
    const id = new Date().toString();
    setIngredients([
      {
        ...newIngredient,
        _id: id
      },
      ...ingredients
    ]);
    onCloseChangedIngredient();
  };
  const checkedIngredients = ingredients.filter(ingredient => {
    if (ingredient._id === undefined) return false;
    return checkedIds.includes(ingredient._id);
  });

  const uncheckedIngredients = ingredients.filter(ingredient => {
    if (ingredient._id === undefined) return false;
    return !checkedIds.includes(ingredient._id);
  });

  const handleEditAmount = (e: any) => {
    const id = e.target.id;
    const newIngredients = [...ingredients];
    const changedIngredient = newIngredients.findIndex(
      ingredient => ingredient._id === id
    );
    newIngredients[changedIngredient].ingredientAmount = e.target.value;
    setIngredients(newIngredients);
  };

  const removeChecked = () => {
    const checked = ingredients.filter(ingredient => {
      if (ingredient._id === undefined) return false;
      return !checkedIds.includes(ingredient._id);
    });
    setIngredients(checked);
  };

  const handleRemoveButton = (id: string) => {
    const newIngredients = ingredients.filter(ingredient => {
      return id !== ingredient._id;
    });
    setIngredients(newIngredients);
  };

  const handleCheckedBox = (e: any) => {
    if (e.target.checked) {
      setCheckedIds(prevIds => [...prevIds, e.target.id]);
    } else {
      const updateId = checkedIds.filter(id => {
        return id !== e.target.id;
      });
      return setCheckedIds(updateId);
    }
  };

  const print = () => {
    window.print();
  };

  return (
    <Container maxW="3xl">
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap="2"
        h="20"
        alignItems="center">
        <GridItem colSpan={1} w="100%"></GridItem>
        <GridItem colSpan={8} w="100%">
          <Heading fontSize="2xl">Shopping list</Heading>
        </GridItem>
        <GridItem colSpan={1} w="100%" mt="5">
          <Button
            variant="outline"
            bg="white"
            onClick={() => setIngredients([])}>
            Clear list
          </Button>
        </GridItem>
        <GridItem colSpan={1} w="100%" mt="5">
          <Button variant="outline" bg="white" onClick={onOpenSendEmail}>
            Share
          </Button>
        </GridItem>
        <GridItem colSpan={1} w="100%" mt="5">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="Print ingredients"
            icon={<TfiPrinter />}
            title="print"
            onClick={print}
          />
        </GridItem>
      </Grid>
      <Button
        variant="outline"
        w="100%"
        h="14"
        ml="2"
        bg="white"
        _hover={{
          background: "white",
          color: "teal.500"
        }}
        onClick={onOpenChangedIngredient}>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="2"
          alignItems="center"
          w="100%">
          <GridItem colSpan={1} w="100%">
            <Icon as={GrAdd} />
          </GridItem>
          <GridItem colSpan={11} w="100%">
            <Text color="gray" fontWeight="normal" textAlign="left">
              ADD ITEM
            </Text>
          </GridItem>
        </Grid>
      </Button>
      <ModalForSendEmail
        isOpen={isOpenSendEmail}
        onClose={() => {
          onCloseSendEmail();
        }}
      />
      <ModalForNewIngredient
        isOpen={isOpenChangedIngredient}
        handleIngredientAdd={handleIngredientAdd}
        onClose={() => {
          onCloseChangedIngredient();
        }}
      />
      {uncheckedIngredients.map(ingredient => (
        <Box key={ingredient._id}>
          <ShoppingListIngredient
            ingredient={ingredient}
            onChange={handleCheckedBox}
            handleEditAmount={handleEditAmount}
            handleRemoveButton={handleRemoveButton}
            defaultChecked={false}
          />
        </Box>
      ))}
      <Box
        borderColor="green"
        w="100%"
        m="2"
        borderWidth="thin"
        borderRadius="5">
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="2"
          alignItems="center"
          w="100%"
          p="2">
          <GridItem colSpan={1} w="100%">
            <Icon as={GrDown} ml="5" />
          </GridItem>
          <GridItem colSpan={9} w="100%">
            <Text color="gray" fontWeight="normal" textAlign="left">
              CHECKED ITEMS
            </Text>
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <Button
              variant="ghost"
              bg="gray"
              leftIcon={<GrClose />}
              onClick={removeChecked}>
              Clear
            </Button>
          </GridItem>
        </Grid>
      </Box>
      {checkedIngredients.map(ingredient => (
        <Box key={ingredient._id}>
          <ShoppingListIngredient
            ingredient={ingredient}
            onChange={handleCheckedBox}
            handleEditAmount={handleEditAmount}
            handleRemoveButton={handleRemoveButton}
            defaultChecked={true}
          />
        </Box>
      ))}
    </Container>
  );
};

export default ShoppingList;
