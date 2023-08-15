import React from "react";
import { Card, CardBody, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SavedRecipe } from "../../utils/types";

type SavedRecipeProps = { recipe: SavedRecipe };

const SavedRecipesItem = ({ recipe }: SavedRecipeProps) => {
  const slug = `${recipe._id}`;
  return (
    <GridItem w="100%">
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
      </Link>
    </GridItem>
  );
};
export default SavedRecipesItem;
