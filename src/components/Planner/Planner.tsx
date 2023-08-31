import React, { useEffect, useState } from "react";
import {
  Center,
  Grid,
  GridItem,
  Text,
  Image,
  Container,
  useToast,
  IconButton,
  Flex,
  Box
} from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import {
  createMealPlan,
  deleteMealPlan,
  getAllMealPlan,
  getRecipe,
  updateMealPlan
} from "../../utils/fetchData";
import { FetchedPlan, Id, PlannerDays, PlannerRecipe } from "../../utils/types";
import { CloseIcon } from "@chakra-ui/icons";

const Planner = () => {
  const [days, setDays] = useState<PlannerDays<PlannerRecipe>>({
    savedRecipes: { sortOrder: 0, recipes: [] },
    Sunday: {
      sortOrder: 1,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Monday: {
      sortOrder: 2,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Tuesday: {
      sortOrder: 3,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Wednesday: {
      sortOrder: 4,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Thursday: {
      sortOrder: 5,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Friday: {
      sortOrder: 6,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Saturday: {
      sortOrder: 7,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    }
  });

  const toast = useToast();
  const showErrorToast = (error: { response: { data: { message: any; }; }; }) => {
    toast({
      title: "Error",
      description: `${error.response.data.message}`,
      status: "error",
      variant: "subtle",
      duration: 4000,
      isClosable: true,
      position: "top"
    });
  };

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
            sortOrder: index,
            mealId: null,
            mealSlot: null
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

  useEffect(() => {
    if (!days.savedRecipes || days.savedRecipes.recipes.length === 0) {
      return;
    }
    getAllMealPlan()
      .then(response => {
        const fetchedMealPlans = response.data.mealPlans;
        setDays(prevDays => {
          let isChanged = false;
          let updatedDays = { ...prevDays };

          fetchedMealPlans.forEach((fetchedPlan: FetchedPlan) => {
            const { dayOfWeek, mealSlot, recipeId } = fetchedPlan;
            const matchingRecipe = prevDays.savedRecipes.recipes.find(
              recipe => recipe.id === recipeId
            );

            if (matchingRecipe) {
              const newUniqueKey = `${dayOfWeek}-${mealSlot}-${recipeId}`;
              const newRecipeEntry = {
                ...matchingRecipe,
                uniqueKey: newUniqueKey,
                mealId: fetchedPlan._id,
                mealSlot: fetchedPlan.mealSlot
              };
              if (!updatedDays[dayOfWeek].recipes) {
                updatedDays[dayOfWeek].recipes = [];
              }
              if (
                !updatedDays[dayOfWeek].recipes.some(
                  recipe => recipe.uniqueKey === newUniqueKey
                )
              ) {
                updatedDays = {
                  ...updatedDays,
                  [dayOfWeek]: {
                    ...updatedDays[dayOfWeek],
                    recipes: [...updatedDays[dayOfWeek].recipes, newRecipeEntry]
                  }
                };
                isChanged = true;
              }
            }
          });
          return isChanged ? updatedDays : prevDays;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [days.savedRecipes]);
  //console.log(days) - working console.log
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    const sourceDayId: Id = source.droppableId;
    const destinationDayId: Id = destination.droppableId;
  //conditions as an attempt to differentiate droppables
    if (sourceDayId === "savedRecipes") {
      const sourceDay = [...days[sourceDayId].recipes];
      const [movedItem] = sourceDay.splice(source.index, 1);
      const destinationDay = [...days[destinationDayId].recipes]; //recipes are not defined on this line 
    //recipes are "lost" in the second droppable when we map on line 371 
    //that is why we even can't console.log an item on line 399
    //while in the first droppable on line 324 we can console.log an item and get a result
      setDays(prevDays => ({
        ...prevDays,
        [sourceDayId]: {
          ...prevDays[sourceDayId],
          recipes: sourceDay
        },
        [destinationDayId]: {
          ...prevDays[destinationDayId],
          recipes: destinationDay
        }
      }));
      
  
      const data = {
        _id: movedItem.mealId,
        recipeId: movedItem.id,
        dayOfWeek: destinationDayId,
        mealSlot: days[destinationDayId].meals[destination.index]
      };
  
      createMealPlan(data).catch(error => {
        showErrorToast(error);
      });
    } 
    if (sourceDayId !== "savedRecipes")  {

      const sourceDay = [...days[sourceDayId].recipes];//recipes are not defined on this line either
      const destinationDay = [...days[destinationDayId].recipes];
      const [movedItem] = sourceDay.splice(source.index, 1);

      const destinationMealSlot = destinationDayId.split("-")[1];
      const mealExistsInSlot = destinationDay.some(
        (item) => item.mealSlot === destinationMealSlot
      );
  
      if (!mealExistsInSlot) {
        movedItem.mealSlot = destinationMealSlot;
        destinationDay.splice(destination.index, 0, movedItem);
  
        setDays(prevDays => ({
          ...prevDays,
          [sourceDayId]: {
            ...prevDays[sourceDayId],
            recipes: sourceDay
          },
          [destinationDayId]: {
            ...prevDays[destinationDayId],
            recipes: destinationDay
          }
        }));
        
        const data = {
          _id: movedItem.mealId,
          recipeId: movedItem.id,
          dayOfWeek: destinationDayId,
          mealSlot: movedItem.mealSlot
        };
  
        updateMealPlan(data)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            showErrorToast(error);
          });
      }
    }
  };

  const handleDelete = (mealId: string) => {
    deleteMealPlan(mealId)
      .then(() => {
        setDays(prevDays => {
          const updatedDays = { ...prevDays };
          Object.keys(updatedDays).forEach(dayId => {
            if (updatedDays[dayId].recipes) {
              updatedDays[dayId].recipes = updatedDays[dayId].recipes.filter(
                recipe => recipe.mealId !== mealId
              );
            }
          });

          return updatedDays;
        });
      })
      .catch(error => {
        console.error("Failed to delete item:", error);
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
      <Grid templateColumns="repeat(8, 1fr)" padding="16px" bg="lightGray">
        {Object.keys(days)
          .sort((a, b) => days[a].sortOrder - days[b].sortOrder)
          .map((dayId, index) => (
            <GridItem
              key={dayId}
              colSpan={{ base: 1, md: 1 }}
              height="60vh"
              overflowY={dayId === "savedRecipes" ? "scroll" : "hidden"}
              borderRight={index !== 0 && index !== 7 ? borderColor : "none"}>
              <Droppable droppableId={dayId} direction="vertical">
                {provided => (
                  <Container
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {dayId === "savedRecipes" &&
                      days[dayId].recipes.map(
                        (item: PlannerRecipe, index: number) => {
                          //console.log(item)
                          return (
                          <Draggable
                            key={`${dayId}-${item.id}`}
                            draggableId={`${dayId}-${item.id}`}
                            index={index}>
                            {(providedDraggable, snapshot) => (
                              <Container
                                ref={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                {...providedDraggable.draggableProps.style}
                                opacity={snapshot.isDragging ? 0.7 : 1}
                                transition={
                                  snapshot.isDragging
                                    ? "none"
                                    : "opacity 0.2s ease"
                                }
                                border={borderColor}
                                borderRadius="5px"
                                padding="0.5rem"
                                mt="0.2rem"
                                width="135px"
                                height="120px">
                                <Center>
                                  <Image
                                    mt="0.2rem"
                                    src={item.image}
                                    alt={item.name}
                                    w="110px"
                                    h="60px"
                                    objectFit="cover"
                                  />
                                </Center>
                                <Center>
                                  <Text
                                    fontWeight="normal"
                                    textAlign="center"
                                    fontSize="xs">
                                    {item.name}
                                  </Text>
                                </Center>
                              </Container>
                            )}
                          </Draggable>
                        )}
                      )}

                    {dayId !== "savedRecipes" &&
                      days[dayId].meals &&
                      days[dayId].meals.map(mealSlot => (
                        <React.Fragment key={mealSlot}>
                          <Box
                            p="2"
                            borderBottom={borderColor}
                            textAlign="center">
                            {mealSlot.toUpperCase()}
                          </Box>
                          <Droppable
                            droppableId={`${dayId}-${mealSlot}`}
                            direction="vertical">
                            {providedMealSlot => (
                              <Container
                                ref={providedMealSlot.innerRef}
                                {...providedMealSlot.droppableProps}
                                border={borderColor}
                                borderRadius="5px"
                                mt="0.5rem"
                                mb="0.5rem"
                                p="0.5rem"
                                minHeight="120px"
                                maxHeight="120px">
                                {days[dayId] &&
                                  days[dayId].recipes &&
                                  days[dayId].recipes
                                    .filter(item => item.mealSlot === mealSlot)
                                    .map(
                                      (item: PlannerRecipe, index: number) => {
                                       // console.log(item)
                                        return (
                                        <Draggable
                                          key={`${item.id}-${mealSlot}-${item.recipeId}`}
                                          draggableId={`${dayId}-${mealSlot}-${item.recipeId}`}
                                          index={index}>
                                          {(providedDraggable, snapshot) => (
                                            <Container
                                              ref={providedDraggable.innerRef}
                                              {...providedDraggable.draggableProps}
                                              {...providedDraggable.dragHandleProps}
                                              {...providedDraggable
                                                .draggableProps.style}
                                              opacity={
                                                snapshot.isDragging ? 0.7 : 1
                                              }
                                              transition={
                                                snapshot.isDragging
                                                  ? "none"
                                                  : "opacity 0.2s ease"
                                              }
                                              width="100%"
                                              height="70px">
                                              <Flex
                                                mt="0.6rem"
                                                justifyContent="center">
                                                <Center>
                                                  <Text
                                                    fontWeight="normal"
                                                    fontSize="xs"
                                                    ml="0"
                                                    mr="0.5rem">
                                                    {item.name}
                                                  </Text>
                                                </Center>
                                                <IconButton
                                                  aria-label="Delete recipe"
                                                  icon={<CloseIcon />}
                                                  mr="0rem"
                                                  size="xs"
                                                  onClick={() =>
                                                    handleDelete(item.mealId)
                                                  }
                                                />
                                              </Flex>
                                            </Container>
                                          )}
                                        </Draggable>
                                      )}
                                    )}
                                {providedMealSlot.placeholder}
                              </Container>
                            )}
                          </Droppable>
                        </React.Fragment>
                      ))}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            </GridItem>
          ))}
      </Grid>
    </DragDropContext>
  );
};

export default Planner;