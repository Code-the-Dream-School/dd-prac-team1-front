import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Text
} from "@chakra-ui/react";
import { getRecipe } from "../utils/fetchData";

const SavedRecipes = () => {
  const [recipes, setResipes] = useState([]);
  useEffect(() => {
    getRecipe()
      .then(response => {
        console.log(response.data.recipe);
        setResipes(response.data.recipe);
      })
      .catch(error => {
        console.log(error);
      });
  });
  // getRecipe()
  //   .then(response => {
  //     console.log(response.data.recipe);
  //     setResipes(response.data.recipe);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  console.log(recipes);
  return (
    <Container maxW="6xl">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} w="100%" h="100"></GridItem>
        <GridItem colSpan={2} w="100%" h="100">
          <Center h="100">
            <Text fontSize="3xl">SAVED RECIPES</Text>
          </Center>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} w="100%">
          <Center>
            <Flex flexDirection="column">
              <Box border="1px" borderBottomStyle="none">
                <Button
                  height="55px"
                  width="250px"
                  variant="link"
                  _focus={{
                    fontWeight: "bold",
                    fontStyle: "italic"
                  }}>
                  SOUPS
                </Button>
              </Box>
              <Box border="1px" borderBottomStyle="none">
                <Button
                  height="55px"
                  width="250px"
                  variant="link"
                  _focus={{
                    fontWeight: "bold",
                    fontStyle: "italic"
                  }}>
                  SALADS
                </Button>
              </Box>
              <Box border="1px" borderBottomStyle="none">
                <Button
                  height="55px"
                  width="250px"
                  variant="link"
                  _focus={{
                    fontWeight: "bold",
                    fontStyle: "italic"
                  }}>
                  DESSERTS
                </Button>
              </Box>
              <Box border="1px">
                <Button
                  height="55px"
                  width="250px"
                  variant="link"
                  _focus={{
                    fontWeight: "bold",
                    fontStyle: "italic"
                  }}>
                  MAIN DISHES
                </Button>
              </Box>
            </Flex>
          </Center>
        </GridItem>
      </Grid>
    </Container>
  );
};
export default SavedRecipes;
