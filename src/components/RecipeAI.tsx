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
  UnorderedList
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AIRecipe } from "../utils/types";
import { saveRecipe } from "../utils/fetchData";
import IngredientList from "./IngredientList";
import InstructionList from "./InstructionList";

type RecipeProps = {
  recipe: AIRecipe;
};

const RecipeAI = ({ recipe }: RecipeProps) => {
  const [save, setSave] = useState<string>("SAVE");
  const [ifSaved, setIfSaved] = useState<boolean>(false);

  const handleSaveRecipe = () => {
    saveRecipe(recipe)
      .then(response => {
        console.log(response);
        setSave("SAVED");
        setIfSaved(true);
      })
      .catch(error => {
        console.log(error);
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
        <Image w="100%" src={recipe.image} alt={recipe.recipeName} />
        <Center>
          <Button
            leftIcon={
              <Icon
                as={ifSaved ? BsHeartFill : BsHeart}
                color={ifSaved ? "white" : ""}
              />
            }
            isDisabled={ifSaved}
            onClick={handleSaveRecipe}>
            {save}
          </Button>
        </Center>
      </GridItem>
    </Grid>
  );
};
export default RecipeAI;
