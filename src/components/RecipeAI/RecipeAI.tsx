import React, { useState } from "react";
import {
  Center,
  Heading,
  Grid,
  GridItem,
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
    <Grid templateColumns="repeat(2, 1fr)" gap="2" mt="10" mb="10">
      <GridItem w="100%" colSpan={1}>
        <Heading size="lg">
          Sure! Here's a simple and delicious recipe for&nbsp;
          {recipe.recipeName.toLocaleUpperCase()}
        </Heading>
      </GridItem>
      <GridItem w="100%" colSpan={1}>
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
      </GridItem>
      <GridItem w="100%" colSpan={1} mt="10">
        <Heading as="h3" mb="10">
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
        <Heading as="h3" mb="10">
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
