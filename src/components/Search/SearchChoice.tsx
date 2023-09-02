import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
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
      alignItems="center"
      h="calc(100vh - 250px)"
      gap={{ base: "10", lg: "20" }}
      direction={{ base: "column", md: "row" }}>
      <Box
        backgroundImage={backgroundImageUrl}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        opacity="0.8"
        position="absolute"
        w="100%"
        h="100%"
        zIndex="-1"
      />
      <Card
        cursor="pointer"
        overflow="hidden"
        onClick={navigateToAISearch}
        w={{ base: "75%", md: "350px", lg: "450px" }}
        h={{ md: "195px", lg: "150px" }}>
        <CardHeader>
          <Center>
            <Heading size={{ base: "sm", md: "md" }}>
              RECIPE FROM OLIVIER
            </Heading>
          </Center>
        </CardHeader>
        <CardBody>
          <Text
            fontSize={{ base: "16", md: "18" }}
            pb="1"
            display={{ base: "none", sm: "block" }}>
            AI powered menu planning helper Olivier will search for delicious
            recipes.
          </Text>
          <Text
            fontSize={{ base: "16", md: "18" }}
            pb="1"
            display={{ base: "none", sm: "block" }}>
            Save the recipes you like to your recipe gallery!
          </Text>
        </CardBody>
      </Card>

      <Card
        cursor="pointer"
        overflow="hidden"
        onClick={navigateToOwnRecipe}
        w={{ base: "75%", md: "325px", lg: "450px" }}
        h={{ md: "195px", lg: "150px" }}>
        <CardHeader>
          <Center>
            <Heading size={{ base: "sm", md: "md" }}>
              ADD YOUR OWN RECIPE
            </Heading>
          </Center>
        </CardHeader>
        <CardBody>
          <Text
            fontSize={{ base: "16", md: "18" }}
            pb="1"
            display={{ base: "none", sm: "block" }}>
            Have a recipe you love?
          </Text>
          <Text
            fontSize={{ base: "16", md: "18" }}
            pb="1"
            display={{ base: "none", sm: "block" }}>
            You can always type it out in our recipe friendly form.
          </Text>
        </CardBody>
      </Card>
      {/* if we will add this part we need to fix rendering (change sizes of cards), gaps between them and margins
      <Card
        cursor="pointer"
        onClick={navigateToOwnRecipe}
        w={{ base: "50%", md: "200px", lg: "300px" }}
        h={{ base: "150px", md: "200px" }}>
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
    </Flex>
  );
};

export default SearchChoice;
