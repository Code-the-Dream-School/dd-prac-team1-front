import React, { useEffect, useState } from "react";
import { Box, Center, Grid, GridItem, Text, Image, Container } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { getRecipe } from "../../utils/fetchData";
import { SavedRecipe } from "../../utils/types";

const Planner = () => {
  const [recipes, setRecipes] = useState<Array<SavedRecipe>>([]);
  useEffect(() => {
    getRecipe()
      .then(response => {
        setRecipes(response.data.recipes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newRecipes = Array.from(recipes);
    const [reorderedItem] = newRecipes.splice(result.source.index, 1);
    newRecipes.splice(result.destination.index, 0, reorderedItem);
    setRecipes(newRecipes);
  };
console.log(recipes)
  return (
    <DragDropContext onDragEnd={result => handleDragEnd(result)}>
      <Grid
        h="200px"
        templateRows={{
          base: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)"
        }}
        templateColumns={{ base: "1fr", md: "repeat(8, 1fr)" }}
        gap={{ base: 0 }}
        gridAutoRows="1fr">
        <GridItem colSpan={{ base: 1, md: 8 }} bg="white" p="3"></GridItem>
        <GridItem colSpan={{ base: 1, md: 8 }} bg="brandGray" p="3">
          <Text>calender and buttons space</Text>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }} bg="lightGray">
          <Center p="3" fontSize="25">
            <Text>RECIPES</Text>
          </Center>
          <Droppable droppableId="list">
            {provided => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {recipes.map((recipe, index) => (
                  <Draggable
                    key={recipe._id}
                    draggableId={recipe._id}
                    index={index}>
                    {(provided, snapshot) => (
                    <Container
                      opacity={snapshot.isDragging ? 0.7 : 1} 
                      transition="opacity 0.2s ease"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      border="2px solid green"
                      borderRadius="5px"
                      padding="1rem 0.5rem"
                      margin="1rem 0.5rem"
                      width="rem"
                      height="170px"
                      >
                      <Image 
                        src={recipe.recipeImage} 
                        alt={recipe.recipeName}
                        borderRadius="lg"
                        w="200px" 
                        h="100px" 
                        objectFit="cover" 
                      />
                      <Center>
                        <Text textAlign="center">{recipe.recipeName}</Text>
                      </Center>
                  </Container>

                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 6 }}>
          <Grid
            h={{ base: "auto", md: "200px" }}
            templateRows={{ base: "repeat(4, 1fr)", md: "repeat(4, 1fr)" }}
            templateColumns={{ base: "1fr", md: "repeat(7, 1fr)" }}>
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
              (weekday, index) => (
                <GridItem
                  key={index}
                  colSpan={{ base: 1, md: 1 }}
                  bg="gray"
                  color="brandGray"
                  p="3">
                  {weekday}
                </GridItem>
              )
            )}

            <GridItem bg="lightGray" colSpan={{ base: 1, md: 7 }}>
              <Text>dates' space</Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </DragDropContext>
  );
};
export default Planner;
