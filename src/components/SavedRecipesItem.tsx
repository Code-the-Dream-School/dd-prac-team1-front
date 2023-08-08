import React, { useState } from "react";
import { Box, Card, CardBody, GridItem, Image, Text } from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
import { SavedRecipe } from "../utils/types";
import SingleSavedRecipe from "./SingleSavedRecipe";

type SavedRecipeProps = { recipe: SavedRecipe };

const SavedRecipesItem = ({ recipe }: SavedRecipeProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const slug = `${recipe._id}`;
  return (
    <GridItem w="100%">
      {/* <Box onClick={() => setSelectedRecipe(recipe._id)}> */}
      <Link to={`/saved-recipes/${slug}`}>
        <Card>
          <CardBody>
            <Image
              boxSize="150px"
              objectFit="cover"
              src={recipe.recipeImage}
              alt={recipe.recipeName}
            />
            <Text fontSize="xs">{recipe.recipeName}</Text>
          </CardBody>
        </Card>
        {/* </Box> */}
      </Link>
    </GridItem>
  );
};
export default SavedRecipesItem;
