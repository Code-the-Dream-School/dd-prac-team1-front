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
    <GridItem maxW={{ base: "175", md: "200" }} onClick={handleClick}>
      <Card size="lg">
        <CardBody p={{ base: "2", md: "3" }} mt="1">
          <Center>
            <Image
              boxSize={{
                base: "135px",
                md: "150px"
              }}
              borderRadius="lg"
              objectFit="cover"
              src={recipe.recipeImage}
              alt={recipe.recipeName}
            />
          </Center>
          <Stack
            overflow="auto"
            mt={{ base: "1", sm: "2", md: "3" }}
            h={{ base: "7", sm: "8", md: "9" }}>
            <Center>
              <Text fontSize="xs">{recipe.recipeName}</Text>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </GridItem>
  );
};
export default SavedRecipesItem;
