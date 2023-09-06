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
      h={{
        base: "calc(100vh - 128px - 167px)",
        sm: "calc(100vh - 55px - 167px)",
        md: "calc(100vh - 55px - 70px)"
      }}
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
    </Flex>
  );
};

export default SearchChoice;
