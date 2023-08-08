import React from "react";
import { Card, CardBody, GridItem, Image, Text } from "@chakra-ui/react";
import { SavedRecipe } from "../utils/types";

type SavedRecipeProps = { recipe: SavedRecipe };

const SavedRecipesItem = ({ recipe }: SavedRecipeProps) => {
  return (
    <GridItem w="100%">
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
    </GridItem>
  );
};
export default SavedRecipesItem;
