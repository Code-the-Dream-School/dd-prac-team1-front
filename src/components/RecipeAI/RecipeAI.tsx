import React, { useState } from "react";
import {
  Center,
  Heading,
  Image,
  Grid,
  GridItem,
  Text,
  Button,
  Icon,
  UnorderedList,
  useToast
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AIRecipe } from "../../utils/types";
import { saveRecipe } from "../../utils/fetchData";
import IngredientList from "./IngredientList";
import InstructionList from "./InstructionList";

type RecipeProps = {
  recipe: AIRecipe;
};

const RecipeAI = ({ recipe }: RecipeProps) => {
  const [save, setSave] = useState<string>("SAVE");
  const [ifSaved, setIfSaved] = useState<boolean>(false);
  const toast = useToast();
  const handleSaveRecipe = () => {
    saveRecipe(recipe)
      .then(response => {
        setSave("SAVED");
        setIfSaved(true);
      })
      .catch(error => {
        console.log(error);
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

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem w="100%">
        <Text>
          Sure! Here's a simple and delicious recipe for {recipe.recipeName}:
        </Text>
        <Heading as="h6">Ingredients:</Heading>
        <UnorderedList>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientList key={index} ingredient={ingredient} />
          ))}
        </UnorderedList>
        <Heading as="h6">Instructions:</Heading>
        {recipe.instructions.map((instruction, index) => (
          <InstructionList key={index} instruction={instruction} />
        ))}
      </GridItem>
      <GridItem w="100%">
        <Center>
          <Button
            variant="outline"
            marginBottom="5"
            leftIcon={
              <Icon
                as={ifSaved ? BsHeartFill : BsHeart}
                color={ifSaved ? "customRed" : ""}
              />
            }
            isDisabled={ifSaved}
            onClick={handleSaveRecipe}>
            {save}
          </Button>
        </Center>
        <Image w="100%" src={recipe.image} alt={recipe.recipeName} />
      </GridItem>
    </Grid>
  );
};
export default RecipeAI;
