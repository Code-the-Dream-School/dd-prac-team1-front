import React from "react";
import { Card, CardBody, GridItem, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SavedRecipe } from "../utils/types";

type SavedRecipeProps = {
  recipe: SavedRecipe;
  // setSearchParams: Function;
};

const SavedRecipesItem = ({
  recipe
}: // setSearchParams
SavedRecipeProps) => {
  const navigate = useNavigate();
  const slug = `${recipe._id}`;

  const handleClick = () => {
    navigate(`/saved-recipes/${slug}`);
    // setSearchParams("")
  };

  return (
    <GridItem w="100%" onClick={handleClick}>
      <Card>
        <CardBody>
          <Image
            boxSize="150px"
            objectFit="cover"
            src={recipe.recipeImage}
            alt={recipe.recipeName}
          />
          <Text fontSize="xs" h="7">
            {recipe.recipeName}
          </Text>
        </CardBody>
      </Card>
    </GridItem>
  );
};
export default SavedRecipesItem;
