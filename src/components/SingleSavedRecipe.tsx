import React, { useState, useEffect } from "react";
import {
  Center,
  Heading,
  Image,
  Grid,
  GridItem,
  Text,
  Button,
  Icon
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { SavedRecipe } from "../utils/types";
import { getSingleRecipe } from "../utils/fetchData";

type SingleSavedRecipeProps = {
  recipe: SavedRecipe;
};

const SingleSavedRecipe = ({ recipe }: SingleSavedRecipeProps) => {
  //   const [save, setSave] = useState<string>("SAVE");
  //   const [ifSaved, setIfSaved] = useState<boolean>(false);
  // const [recipes, setRecipes] = useState([]);
  // const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const { slug } = useParams();
  const id = slug;
  useEffect(() => {
    getSingleRecipe(id)
      .then((response: { data: { recipe: any } }) => {
        console.log(response.data);
        // setRecipes(response.data.recipe);
        // setFilteredRecipes(response.data.recipe);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [id]);

  // const handleSaveRecipe = () => {
  //   saveRecipe(recipe)
  //     .then(response => {
  //       console.log(response.data.data);
  //       setSave("SAVED");
  //       setIfSaved(true);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {/* <GridItem w="100%">
        <Text>
          Sure! Here's a simple and delicious recipe for {recipe.recipeName}:
        </Text>
        <Heading as="h6">Ingredients:</Heading>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientList key={index} ingredient={ingredient} />
        ))}
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
            onClick={handleSaveRecipe}>
            {save}
          </Button>
        </Center>
      </GridItem> */}
    </Grid>
  );
};
export default SingleSavedRecipe;
