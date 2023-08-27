import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Text
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const SearchChoice = () => {
  const navigate = useNavigate();
  const navigateToAISearch = () => {
    navigate("/ai-recipe");
  };
  const navigateToOwnRecipe = () => {
    navigate("/manual-recipe");
  };

  return (
    <Flex justifyContent={"center"} h="85vh">
      <HStack spacing={20}>
        <Card cursor="pointer" onClick={navigateToAISearch}>
          <CardHeader>
            <Center>
              <Heading size="md">RECIPE FROM OLIVIER</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <Text>
              AI powered menu planning helper Olivier will search for delicious
              recipes.
            </Text>
            <Text>Save the recipes you like to your recipe gallery!</Text>
          </CardBody>
        </Card>
        <Card cursor="pointer" onClick={navigateToOwnRecipe}>
          <CardHeader>
            <Heading size="md">ADD YOUR OWN RECIPE </Heading>
          </CardHeader>
          <CardBody>
            <Text>Have a recipe you love?</Text>
            <Text>You can always type it out in our recipe friendly form.</Text>
          </CardBody>
        </Card>
      </HStack>
    </Flex>
  );
};

export default SearchChoice;
