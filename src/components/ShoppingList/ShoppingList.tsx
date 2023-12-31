import React, { useState, useEffect, useRef } from "react";
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
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { TbShare3 } from "react-icons/tb";
import { TfiPrinter } from "react-icons/tfi";
import {
  addIngredientToShoppingList,
  getIngredientsFromShoppingList,
  editAnIngredientFromShoppingList,
  deleteAnIngredientFromShoppingList,
  deleteAllShoppingList,
  shareShoppingList
} from "../../utils/fetchData";
import { SavedIngredient } from "../../utils/types";
import ModalForNewIngredient from "./ModalForNewIngredient";
import ModalForSendEmail from "./ModalForSendEmail";
import ShoppingListIngredient from "./ShoppingListIngredient";
import PrintShoppingList from "./PrintShoppingList";
const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([]);
  const [checkedIngredientNames, setCheckedIngredientNames] = useState<
    Array<string>
  >([]);
  const [highlightExistingIngredient, setHighlightExistingIngredient] =
    useState<string>("");
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
  const ref = useRef<HTMLDivElement | null>(null);

  const getIngredients = () => {
    getIngredientsFromShoppingList()
      .then(response => {
        setIngredients(response.data.ingredients);
      })
      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
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
  useEffect(() => {
    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleIngredientAdd = (newIngredient: SavedIngredient) => {
    addIngredientToShoppingList(newIngredient)
      .then(response => {
        if (
          response.data.message.includes(
            "Ingredient already exists in shopping list"
          )
        ) {
          setHighlightExistingIngredient(
            response.data.existingIngredient.ingredientName
          );
          setTimeout(() => {
            if (ref.current) {
              ref.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            }
          }, 200);
          setTimeout(() => {
            setHighlightExistingIngredient("");
          }, 4000);
          toast({
            title: "",
            description: "",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
            render: () => (
              <>
                <Box p="7" bg="green" borderRadius="5">
                  {response.data.message}
                </Box>
              </>
            )
          });
        }
        getIngredients();
      })
      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
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
    const editedIngredient = ingredients.filter(
      ingredient => ingredientName === ingredient.ingredientName
    );
    const newIngredient = editedIngredient.pop();
    if (newIngredient === undefined) return;
    editAnIngredientFromShoppingList(newIngredient)
      .then(response => {})
      .catch(error => {
        getIngredients();
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
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
        deleteAnIngredientFromShoppingList(ingredientName)
          .then(response => {})
          .catch(error => {
            toast({
              title: "Error",
              description: `${
                error?.response?.data?.msg ||
                error?.response?.data?.message ||
                error?.response?.data?.error ||
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
      }, 250 * index);
    });
    setIngredients(unChecked);
  };

  const handleRemoveIngredient = (ingredientName: string) => {
    deleteAnIngredientFromShoppingList(ingredientName)
      .then(response => {
        const newIngredients = ingredients.filter(ingredient => {
          return ingredientName !== ingredient.ingredientName;
        });
        setIngredients(newIngredients);
      })
      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
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

  const handleRemoveIngredients = () => {
    deleteAllShoppingList()
      .then(response => {
        setIngredients([]);
      })
      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
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

  const share = (email: string) => {
    shareShoppingList(email)
      .then(response => {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="3" bg="green" borderRadius="5">
                {response.data.message}
              </Box>
            </>
          )
        });
      })
      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
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

  const print = () => {
    const printDiv = document.getElementById("printDiv");
    if (!printDiv) return;
    let printContents = printDiv.innerHTML;

    const pri = document.getElementById("ifmcontentstoprint");
    if (!pri) return;
    //@ts-ignore
    var priW = pri.contentWindow;
    priW.document.open();
    priW.document.write(printContents);
    priW.document.close();
    priW.focus();
    priW.print();
  };

  return (
    <Container maxW="3xl">
      {/* Iframe for printing content */}
      <iframe
        title="printer"
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}></iframe>

      {/* Div for printing content */}
      <Box id="printDiv" display="none">
        <PrintShoppingList ingredients={ingredients} />
      </Box>

      <Grid
        templateColumns="repeat(12, 1fr)"
        gap="2"
        mt="5"
        alignItems="center"
        justifyContent="center">
        <GridItem colSpan={{ base: 12, sm: 9 }} w="100%">
          <Heading
            fontSize={{
              base: "xl",
              md: "2xl",
              lg: "3xl"
            }}>
            SHOPPING LIST
          </Heading>
        </GridItem>
        <GridItem colSpan={{ base: 4, sm: 1 }} w="100%">
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
        <GridItem
          colSpan={{ base: 4, sm: 1 }}
          w="100%"
          textAlign={{ base: "center", sm: "center" }}>
          <IconButton
            size="lg"
            variant="ghost"
            color="#505050"
            bg="brandGray"
            aria-label="Share the shopping List"
            fontSize="20"
            icon={<TbShare3 />}
            title="share the shopping list"
            onClick={onOpenSendEmail}
          />
        </GridItem>
        <GridItem
          colSpan={{ base: 4, sm: 1 }}
          w="100%"
          textAlign={{ base: "end", sm: "center" }}>
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
        mt="5"
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
        share={share}
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
        <Box
          key={ingredient._id}
          ref={
            highlightExistingIngredient === ingredient.ingredientName
              ? ref
              : null
          }>
          <ShoppingListIngredient
            ingredient={ingredient}
            onChange={handleCheckedBox}
            handleEditAmount={handleEditAmount}
            handleRemoveIngredient={handleRemoveIngredient}
            handleEditIngredient={handleEditIngredient}
            defaultChecked={false}
            textDecoration={"none"}
            highlightExistingIngredient={highlightExistingIngredient}
          />
        </Box>
      ))}
      <Box borderColor="green" w="100%" mt="1" mb="1" borderWidth="thin">
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="2"
          alignItems="center"
          w="100%">
          <GridItem colSpan={1} w="100%"></GridItem>
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
      <Box mb="10">
        {checkedIngredients.map(ingredient => (
          <Box
            key={ingredient._id}
            ref={
              highlightExistingIngredient === ingredient.ingredientName
                ? ref
                : null
            }>
            <ShoppingListIngredient
              ingredient={ingredient}
              onChange={handleCheckedBox}
              handleEditAmount={handleEditAmount}
              handleRemoveIngredient={handleRemoveIngredient}
              handleEditIngredient={handleEditIngredient}
              defaultChecked={true}
              textDecoration={"line-through"}
              highlightExistingIngredient={highlightExistingIngredient}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ShoppingList;
