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

  return (
    <Flex justifyContent={"center"} h="md">
      <HStack spacing={20}>
        <Card cursor="pointer" onClick={navigateToAISearch} size="lg">
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

        <Card cursor="not-allowed" size="lg">
          <CardHeader>
            <Center>
              <Heading size="md">ADD YOUR OWN RECIPE By Hand</Heading>
            </Center>
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
