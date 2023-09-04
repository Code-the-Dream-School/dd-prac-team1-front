import React from "react";
import {
  Card,
  CardBody,
  Center,
  GridItem,
  Image,
  Stack,
  Text
} from "@chakra-ui/react";
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
    <GridItem onClick={handleClick} justifySelf="stretch">
      <Card size="lg" cursor="pointer">
        <CardBody p="2" mt="1">
          <Center>
            <Image
              boxSize="full"
              borderRadius="lg"
              objectFit="cover"
              height="150px"
              src={recipe.recipeImage}
              alt={recipe.recipeName}
            />
          </Center>
          <Stack
            noOfLines={1}
            textAlign="center"
            mt={{ base: "1", sm: "2", md: "3" }}
            h={{ base: "8", sm: "8", md: "9" }}>
            <Text fontSize="xs">{recipe.recipeName}</Text>
          </Stack>
        </CardBody>
      </Card>
    </GridItem>
  );
};
export default SavedRecipesItem;
