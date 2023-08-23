import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Box,
  HStack,
  Heading,
  Grid,
  GridItem,
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
    <Grid>
      <GridItem
        colSpan={1}
        w="100%"
        h="82vh"
        padding="50"
        display="flex"
        flexDirection="column">
        <Center>
          <Box p="10%">
            <HStack spacing={20}>
              <Card cursor="pointer" onClick={navigateToAISearch}>
                <CardHeader>
                  <Center>
                    <Heading size="md">RECIPE FROM OLIVIER</Heading>
                  </Center>
                </CardHeader>
                <CardBody>
                  <Text>
                    AI powered menu planning helper Olivier will search for
                    delicious recipes.
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
                  <Text>
                    You can always type it out in our recipe friendly form.
                  </Text>
                </CardBody>
              </Card>
            </HStack>
          </Box>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default SearchChoice;
