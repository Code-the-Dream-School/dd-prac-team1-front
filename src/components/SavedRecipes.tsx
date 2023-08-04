import React from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const SavedRecipe = () => {
  return (
    <Box>
      <Text> SAVED RECIPES</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%"></GridItem>
        <GridItem w="100%"></GridItem>
      </Grid>
    </Box>
  );
};
export default SavedRecipe;
