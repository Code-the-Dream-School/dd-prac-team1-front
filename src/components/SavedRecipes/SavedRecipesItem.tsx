import React from "react";
import { Card, CardBody, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SavedRecipe } from "../../utils/types";

type SavedRecipeProps = {
  recipe: SavedRecipe;
};

const SavedRecipesItem = ({ recipe }: SavedRecipeProps) => {
  const navigate = useNavigate();
  const slug = `${recipe._id}`;

  const handleClick = () => {
    navigate(`/saved-recipes/${slug}`);
  };

  return (
    <GridItem w="100%" onClick={handleClick}>
      <Card>
        <CardBody>
          <Image
            boxSize="150px"
            borderRadius="lg"
            objectFit="cover"
            mt="5"
            src={recipe.recipeImage}
            alt={recipe.recipeName}
          />
          <Stack mt="3">
            <Text fontSize="xs" h="7">
              {recipe.recipeName}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </GridItem>
  );
};
export default SavedRecipesItem;
