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
import { Id, PlannerDays, PlannerRecipe } from "../../utils/types";

const Planner = () => {
  const [days, setDays] = useState<PlannerDays<PlannerRecipe>>({
    savedRecipes: { sortOrder: 0, recipes: [] },
    day1: { sortOrder: 1, recipes: [] },
    day2: { sortOrder: 2, recipes: [] },
    day3: { sortOrder: 3, recipes: [] },
    day4: { sortOrder: 4, recipes: [] },
    day5: { sortOrder: 5, recipes: [] },
    day6: { sortOrder: 6, recipes: [] },
    day7: { sortOrder: 7, recipes: [] }
  });

  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const borderColor = "2px solid #d7da5e";

  useEffect(() => {
    getRecipe()
      .then(response => {
        const fetchedRecipes = response.data.recipes;
        const savedRecipesItems = fetchedRecipes.map(
          (recipe: PlannerRecipe, index: number) => ({
            id: recipe._id,
            name: recipe.recipeName,
            image: recipe.recipeImage,
            sortOrder: index
          })
        );
        setDays(prevDays => ({
          ...prevDays,
          savedRecipes: { ...prevDays.savedRecipes, recipes: savedRecipesItems }
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceDayId: Id = result.source.droppableId;
    const destinationDayId: Id = result.destination.droppableId;
    const sourceDay = days[sourceDayId].recipes;
    const destinationDay = days[destinationDayId].recipes;

    const movedItem = sourceDay.splice(result.source.index, 1)[0];

    if (destinationDayId !== "savedRecipes" && destinationDay.length >= 3) {
      days.savedRecipes.recipes.push(movedItem);
    } else {
      destinationDay.splice(result.destination.index, 0, movedItem);
    }

    setDays({
      ...days,
      [sourceDayId]: { ...days[sourceDayId], recipes: sourceDay },
      [destinationDayId]: {
        ...days[destinationDayId],
        recipes: destinationDay
      }
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
          <Text>calendar and buttons space</Text>
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

        {daysOfTheWeek.map((weekday, index) => (
          <GridItem
            key={index}
            colSpan={{ base: 1, md: 1 }}
            bg="customGray"
            textAlign="center"
            p="2"
            color="brandGray"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            fontSize="20">
            {weekday}
          </GridItem>
        ))}
      </Grid>
      <Grid
        templateColumns="repeat(8, 1fr)"
        gap="16px"
        padding="16px"
        bg="lightGray">
        {Object.keys(days)
          .sort((a, b) => days[a].sortOrder - days[b].sortOrder)
          .map((dayId, index) => (
            <Droppable key={dayId} droppableId={dayId} direction="vertical">
              {provided => (
                <GridItem
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  colSpan={{ base: 1, md: 1 }}
                  height="60vh"
                  overflowY={dayId === "savedRecipes" ? "scroll" : "hidden"}
                  borderRight={
                    index !== 0 && index !== 7 ? borderColor : "none"
                  }>
                  {days[dayId].recipes
                    .slice(
                      0,
                      dayId === "savedRecipes" ? days[dayId].recipes.length : 3
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
                            border={borderColor}
                            borderRadius="5px"
                            padding="0.5rem"
                            mt={dayId !== "savedRecipes" ? "2.2rem" : "0"}
                            mb={dayId !== "savedRecipes" ? "2rem" : "0.2rem"}
                            mr={dayId !== "savedRecipes" ? "1rem" : "1.2rem"}
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
