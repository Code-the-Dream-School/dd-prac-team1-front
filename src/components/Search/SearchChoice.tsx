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
  const backgroundImageUrl = "url('/images/produce.png')";

  return (
    <Flex
      justifyContent="center"
      // h="85vh"
      direction={{ base: "column", md: "row" }}>
      <Flex
        backgroundImage={backgroundImageUrl}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        opacity={0.8}
        position="absolute"
        width="100%"
        height="90%"
        zIndex={-1}
      />
      {/* <HStack spacing={20}> */}
      <Card cursor="pointer" onClick={navigateToAISearch} maxW="sm" h="200px">
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

      <Card cursor="pointer" onClick={navigateToOwnRecipe} maxW="sm" h="200px">
        <CardHeader>
          <Center>
            <Heading size="md">ADD YOUR OWN RECIPE </Heading>
          </Center>
        </CardHeader>
        <CardBody>
          <Text>Have a recipe you love?</Text>
          <Text>You can always type it out in our recipe friendly form.</Text>
        </CardBody>
      </Card>
      {/* <Card cursor="pointer" onClick={navigateToOwnRecipe} maxW="sm">
          <CardHeader>
            <Center>
              <Heading size="md">ADD BY URL </Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <Text>Discovered a recipe you enjoy online? </Text>
            <Text>Simply copy and paste the website URL right here.</Text>
          </CardBody>
        </Card> */}
      {/* </HStack> */}
    </Flex>
  );
};

export default SearchChoice;
