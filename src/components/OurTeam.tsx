import React, { useState, useEffect } from "react";
import { Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";


const OurTeam = () => {
  
  return (
    <Container maxW="7xl">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} w="100%" h="100"></GridItem>
        <GridItem colSpan={2} w="100%" h="100">
          <Center h="100">
            <Text fontSize="3xl">OUR TEAM</Text>
          </Center>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
       
      </Grid>
    </Container>
  );
};
export default OurTeam;