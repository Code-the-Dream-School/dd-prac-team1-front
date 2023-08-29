import React, { useState } from "react";
import {
  Center,
  Heading,
  Grid,
  GridItem,
  Text,
  Button,
  Icon,
  UnorderedList
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

  const handleSaveRecipe = () => {
    saveRecipe(recipe)
      .then(response => {
        setSave("SAVED");
        setIfSaved(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="2" mt="5">
      <GridItem w="100%" colSpan={1}>
        <Text>
          Sure! Here's a simple and delicious recipe for {recipe.recipeName}:
        </Text>
      </GridItem>
      <GridItem w="100%" colSpan={1}>
        <Center>
          <Button
            variant="outline"
            marginBottom="5"
            leftIcon={
              <Icon
                as={ifSaved ? BsHeartFill : BsHeart}
                color={ifSaved ? "red" : ""}
              />
            }
            isDisabled={ifSaved}
            onClick={handleSaveRecipe}>
            {save}
          </Button>
        </Center>
      </GridItem>
      <GridItem w="100%" colSpan={1} mt="10">
        <Heading as="h6" mb="10">
          Ingredients:
        </Heading>
        <UnorderedList>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientList key={index} ingredient={ingredient} />
          ))}
        </UnorderedList>
      </GridItem>
      <GridItem
        colSpan={1}
        h="400px"
        backgroundImage={recipe.image}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        borderRadius="5"
      />
      <GridItem w="100%" colSpan={{ base: 2, md: 1 }}>
        <Heading as="h6" mb="10">
          Instructions:
        </Heading>
        {recipe.instructions.map((instruction, index) => (
          <InstructionList key={index} instruction={instruction} />
        ))}
      </GridItem>
      <GridItem colSpan={{ base: 0, md: 1 }} />
    </Grid>
  );
};
export default RecipeAI;
