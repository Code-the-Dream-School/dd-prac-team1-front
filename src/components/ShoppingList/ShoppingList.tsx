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
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { IoAdd, IoTrashOutline, IoChevronDown } from "react-icons/io5";
import { TfiPrinter } from "react-icons/tfi";
import { MdIosShare } from "react-icons/md";
import {
  getIngredientsFromShoppingList,
  editAnIngredientFromShoppingList,
  deleteAnIngredientFromShoppingList,
  deleteAllShoppingList
} from "../../utils/fetchData";
import { SavedIngredient } from "../../utils/types";
import ModalForNewIngredient from "./ModalForNewIngredient";
import ModalForSendEmail from "./ModalForSendEmail";
import ShoppingListIngredient from "./ShoppingListIngredient";

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([]);
  const [checkedIngredientNames, setCheckedIngredientNames] = useState<
    Array<string>
  >([]);
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
  const toast = useToast();

  const getIngredients = () => {
    getIngredientsFromShoppingList()
      .then(response => {
        console.log(response);
        setIngredients(response.data.ingredients);
      })
      .catch(error => {
        console.log(error);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      });
  };
  useEffect(() => {
    getIngredients();
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
    if (ingredient.ingredientName === undefined) return false;
    return checkedIngredientNames.includes(ingredient.ingredientName);
  });

  const uncheckedIngredients = ingredients.filter(ingredient => {
    if (ingredient.ingredientName === undefined) return false;
    return !checkedIngredientNames.includes(ingredient.ingredientName);
  });

  const handleEditAmount = (e: any) => {
    const ingredientName = e.target.name;
    const newIngredients = [...ingredients];
    const changedIngredient = newIngredients.findIndex(
      ingredient => ingredient.ingredientName === ingredientName
    );
    newIngredients[changedIngredient].ingredientAmount = e.target.value;
    setIngredients(newIngredients);
  };

  const handleEditIngredient = (e: any) => {
    const ingredientName = e.target.name;
    console.log(ingredients);
    const editedIngredient = ingredients.filter(
      ingredient => ingredientName === ingredient.ingredientName
    );
    const newIngredient = editedIngredient.pop();
    console.log(newIngredient);
    if (newIngredient === undefined) return;
    editAnIngredientFromShoppingList(newIngredient)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        getIngredients();
        console.log(error);
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data ||
            error.message ||
            "unknown error"
          }`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      });
  };

  const handleCheckedBox = (e: any) => {
    console.log(e);
    if (e.target.checked) {
      setCheckedIngredientNames(prevName => [...prevName, e.target.name]);
    } else {
      const updateName = checkedIngredientNames.filter(name => {
        return name !== e.target.name;
      });
      return setCheckedIngredientNames(updateName);
    }
  };

  const removeChecked = () => {
    const checked = ingredients.filter(ingredient => {
      if (ingredient.ingredientName === undefined) return false;
      return checkedIngredientNames.includes(ingredient.ingredientName);
    });
    const unChecked = ingredients.filter(ingredient => {
      if (ingredient.ingredientName === undefined) return false;
      return !checkedIngredientNames.includes(ingredient.ingredientName);
    });
    checked.forEach((ingredient, index) => {
      setTimeout(() => {
        const ingredientName = ingredient.ingredientName;
        console.log(ingredientName);
        deleteAnIngredientFromShoppingList(ingredientName)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            toast({
              title: "Error",
              description: `${
                error?.response?.data?.msg ||
                error?.response?.data?.message ||
                error?.response?.data ||
                error.message ||
                "unknown error"
              }`,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"
            });
          });
        console.log("Delayed for 1 second.");
      }, 250 * index);
    });
    console.log(checked);
    setIngredients(unChecked);
  };

  const handleRemoveIngredient = (ingredientName: string) => {
    deleteAnIngredientFromShoppingList(ingredientName)
      .then(response => {
        console.log(response);
        const newIngredients = ingredients.filter(ingredient => {
          return ingredientName !== ingredient.ingredientName;
        });
        setIngredients(newIngredients);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRemoveIngredients = () => {
    deleteAllShoppingList()
      .then(response => {
        console.log(response);
        setIngredients([]);
      })
      .catch(error => {
        console.log(error);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      });
  };

  const print = () => {
    window.print();
  };

  return (
    <Container maxW="3xl">
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap="2"
        mt="5"
        h="20"
        alignItems="center">
        <GridItem colSpan={9} w="100%">
          <Heading ml="2" fontSize="2xl">
            Shopping List
          </Heading>
        </GridItem>
        <GridItem colSpan={1} w="100%">
          <IconButton
            size="lg"
            variant="ghost"
            color="#505050"
            bg="brandGray"
            aria-label="Delete all ingredients"
            icon={<IoTrashOutline />}
            title="delete all"
            onClick={handleRemoveIngredients}
          />
        </GridItem>
        <GridItem colSpan={1} w="100%">
          <IconButton
            size="lg"
            variant="ghost"
            color="#505050"
            bg="brandGray"
            aria-label="Delete all ingredients"
            icon={<MdIosShare />}
            title="delete all"
            onClick={onOpenSendEmail}
          />
        </GridItem>
        <GridItem colSpan={1} w="100%">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="Print ingredients"
            color="#505050"
            bg="brandGray"
            icon={<TfiPrinter />}
            title="print"
            onClick={print}
          />
        </GridItem>
      </Grid>
      <Button
        variant="outline"
        w="100%"
        h="12"
        mb="1"
        borderRadius="0"
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
            <Icon style={{ color: "#505050", fontSize: 20 }} as={IoAdd} />
          </GridItem>
          <GridItem colSpan={11} w="100%">
            <Text color="#505050" fontWeight="normal" textAlign="left">
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
            handleRemoveIngredient={handleRemoveIngredient}
            handleEditIngredient={handleEditIngredient}
            defaultChecked={false}
            textDecoration={"none"}
          />
        </Box>
      ))}
      <Box borderColor="green" w="100%" mt="1" mb="1" borderWidth="thin">
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="2"
          alignItems="center"
          w="100%">
          <GridItem colSpan={1} w="100%">
            <Icon
              style={{ color: "#505050", fontSize: 20 }}
              as={IoChevronDown}
              ml="5"
            />
          </GridItem>
          <GridItem colSpan={10} w="100%">
            <Text color="#505050" fontWeight="normal" textAlign="left">
              CHECKED ITEMS
            </Text>
          </GridItem>
          <GridItem colSpan={1} w="100%">
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="Delete checked ingredients"
              color="#505050"
              bg="brandGray"
              w="100%"
              borderRadius="0"
              icon={<IoTrashOutline />}
              title="delete checked"
              onClick={removeChecked}
            />
          </GridItem>
        </Grid>
      </Box>
      {checkedIngredients.map(ingredient => (
        <Box key={ingredient._id}>
          <ShoppingListIngredient
            ingredient={ingredient}
            onChange={handleCheckedBox}
            handleEditAmount={handleEditAmount}
            handleRemoveIngredient={handleRemoveIngredient}
            handleEditIngredient={handleEditIngredient}
            defaultChecked={true}
            textDecoration={"line-through"}
          />
        </Box>
      ))}
    </Container>
  );
};

export default ShoppingList;
