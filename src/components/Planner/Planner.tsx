import React, { useEffect, useState } from "react";
import {
  Center,
  Grid,
  GridItem,
  Text,
  Image,
  Container
} from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { getRecipe } from "../../utils/fetchData";
import { PlannerRecipe } from "../../utils/types";

const Planner = () => {
  const [columns, setColumns] = useState({
    column1: [],
    column2: [],
    column3: [],
    column4: [],
    column5: [],
    column6: [],
    column7: [],
    column8: []
  });

  useEffect(() => {
    getRecipe()
      .then(response => {
        const fetchedRecipes = response.data.recipes;
        const column1Items = fetchedRecipes.map((recipe: PlannerRecipe) => ({
          id: recipe._id,
          name: recipe.recipeName,
          image: recipe.recipeImage
        }));
        setColumns({
          column1: column1Items,
          column2: [],
          column3: [],
          column4: [],
          column5: [],
          column6: [],
          column7: [],
          column8: []
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  type ColumnId = keyof typeof columns;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumnId: ColumnId = result.source.droppableId as ColumnId;
    const destinationColumnId: ColumnId = result.destination
      .droppableId as ColumnId;
    console.log(typeof columns);
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];

    const movedItem = sourceColumn.splice(result.source.index, 1)[0];

    if (destinationColumnId !== "column1" && destinationColumn.length >= 3) {
      columns.column1.push(movedItem);
    } else {
      destinationColumn.splice(result.destination.index, 0, movedItem);
    }

    setColumns({
      ...columns,
      [sourceColumnId]: sourceColumn,
      [destinationColumnId]: destinationColumn
    });
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Grid
        h="200px"
        templateRows={{
          base: "repeat(9, 1fr)",
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
        <GridItem
          colSpan={{ base: 1, md: 1 }}
          bg="lightGray"
          display="flex"
          flexDirection="column"
          justifyContent="center">
          <Center p="1" fontSize="25">
            <Text>RECIPES</Text>
          </Center>
        </GridItem>

        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
          (weekday, index) => (
            <GridItem
              key={index}
              colSpan={{ base: 1, md: 1 }}
              bg="gray"
              textAlign="center"
              p="2"
              color="brandGray"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              fontSize="20">
              {weekday}
            </GridItem>
          )
        )}
      </Grid>
      <Grid
        templateColumns="repeat(8, 1fr)"
        gap="16px"
        padding="16px"
        bg="lightGray">
        {Object.keys(columns).map((columnId, index) => (
          <Droppable key={columnId} droppableId={columnId} direction="vertical">
            {provided => (
              <GridItem
                ref={provided.innerRef}
                {...provided.droppableProps}
                colSpan={{ base: 1, md: 1 }}
                height="60vh"
                overflowY={columnId === "column1" ? "scroll" : "hidden"}
                borderRight={
                  index !== 0 && index !== 7 ? "2px solid #d7da5e" : "none"
                }>
                {columns[columnId as keyof typeof columns]
                  .slice(
                    0,
                    columnId === "column1"
                      ? columns[columnId as keyof typeof columns].length
                      : 3
                  )
                  .map((item: PlannerRecipe, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(providedDraggable, snapshot) => (
                        <Container
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          {...providedDraggable.draggableProps.style}
                          opacity={snapshot.isDragging ? 0.7 : 1}
                          transition="opacity 0.2s ease"
                          border="2px solid #d7da5e"
                          borderRadius="5px"
                          padding="0.5rem"
                          mt={columnId !== "column1" ? "2.2rem" : "0"}
                          mb={columnId !== "column1" ? "2rem" : "0.2rem"}
                          mr={columnId !== "column1" ? "1rem" : "1.2rem"}
                          width="rem"
                          height="140px">
                          <Image
                            mt="0.5rem"
                            src={item.image}
                            alt={item.name}
                            w="180px"
                            h="70px"
                            objectFit="cover"
                          />
                          <Center>
                            <Text
                              fontWeight="semibold"
                              mt="0.2rem"
                              textAlign="center"
                              fontSize="sm">
                              {item.name}
                            </Text>
                          </Center>
                        </Container>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </GridItem>
            )}
          </Droppable>
        ))}
      </Grid>
    </DragDropContext>
  );
};
export default Planner;
