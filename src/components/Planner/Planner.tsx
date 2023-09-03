import React, { useCallback, useEffect, useState } from "react";
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
  Box,
  Button
} from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import {
  createMealPlan,
  deleteMealPlan,
  getAllMealPlan,
  getRecipe,
  saveRecipeIngredientsToShoppingList,
  updateMealPlan
} from "../../utils/fetchData";
import {
  Error,
  FetchedPlan,
  HoveringButtonState,
  Id,
  PlannerDays,
  PlannerRecipe
} from "../../utils/types";
import { CloseIcon } from "@chakra-ui/icons";

const Planner = () => {
  const [days, setDays] = useState<PlannerDays<PlannerRecipe>>({
    savedRecipes: {
      sortOrder: 0,
      recipes: [],
      mealId: null
    },
    Sunday: {
      sortOrder: 1,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    },
    Monday: {
      sortOrder: 2,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    },
    Tuesday: {
      sortOrder: 3,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    },
    Wednesday: {
      sortOrder: 4,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    },
    Thursday: {
      sortOrder: 5,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    },
    Friday: {
      sortOrder: 6,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    },
    Saturday: {
      sortOrder: 7,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: [],
      mealId: null,
      mealSlot: null
    }
  });
    
  const [isHovering, setIsHovering] = useState<HoveringButtonState>({});
  const onMouseEnter = (mealId: string) => {
    setIsHovering({ ...isHovering, [mealId]: true });
  };

  const onMouseLeave = (mealId: string) => {
    setIsHovering({ ...isHovering, [mealId]: false });
  };

  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const borderColor = "2px solid #d7da5e";

  const toast = useToast();
  const showErrorToast = useCallback(
    (error: Error) => {
      toast({
        title: "Error",
        description: `${
          error?.response?.data?.msg ||
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data ||
          error.message ||
          "unknown error"
        }`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    },
    [toast]
  );

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
        showErrorToast(error);
      });
  }, [showErrorToast]);

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
            const { dayOfWeek, recipeId } = fetchedPlan;
            const matchingRecipe = prevDays.savedRecipes.recipes.find(
              recipe => recipe.id === recipeId
            );

            if (matchingRecipe) {
              const newRecipeEntry = {
                ...matchingRecipe,
                mealId: fetchedPlan._id,
                mealSlot: fetchedPlan.mealSlot
              };
              if (!updatedDays[dayOfWeek].recipes) {
                updatedDays[dayOfWeek].recipes = [];
              }
              if (
                !updatedDays[dayOfWeek].recipes.some(
                  recipe => recipe.mealId === fetchedPlan._id
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
        showErrorToast(error);
      });
  }, [days.savedRecipes, showErrorToast]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || destination.droppableId === "savedRecipes") {
      return;
    }
    

    const sourceId: Id = source.droppableId;
    const destinationId: Id = destination.droppableId;

    if (sourceId === "savedRecipes") {
      const sourceDay = [...days[sourceId].recipes];
      const movedItem = { ...sourceDay[source.index] };  
      const [destDayId, destMealSlot] = destinationId.split("-");

      const destinationDay = [...(days[destDayId]?.recipes || [])];
      movedItem.mealSlot = destMealSlot;
      destinationDay.splice(destination.index, 0, movedItem);

      setDays(prevDays => ({
        ...prevDays,
        [sourceId]: {
          ...prevDays[sourceId],
          recipes: sourceDay
        },
        [destDayId]: {
          ...prevDays[destDayId],
          recipes: destinationDay
        }
      }));

      const data = {
        _id: movedItem.mealId,
        recipeId: movedItem.id,
        dayOfWeek: destDayId,
        mealSlot: destMealSlot
      };
      createMealPlan(data)
        .then(response => {
          const newMealId = response.data.newMealPlan._id;
          setDays(prevDays => {
            const updatedDay = { ...prevDays[data.dayOfWeek] };
            const updatedRecipes = updatedDay.recipes.map(recipe => {
              if (
                recipe.id === data.recipeId &&
                recipe.mealSlot === data.mealSlot
              ) {
                return { ...recipe, mealId: newMealId };
              }
              return recipe;
            });
            return {
              ...prevDays,
              [data.dayOfWeek]: { ...updatedDay, recipes: updatedRecipes }
            };
          });
        })
        .catch(error => {
          showErrorToast(error);
        });
    } else if (sourceId !== "savedRecipes") {
      const [sourceDayId, sourceMealSlot] = sourceId.split("-");
      const [destDayId, destMealSlot] = destinationId.split("-");

      const sourceDay = [...(days[sourceDayId]?.recipes || [])];
      const destinationDay = [...(days[destDayId]?.recipes || [])];

      const [movedItem] = sourceDay.splice(
        sourceDay.findIndex(item => item.mealSlot === sourceMealSlot),
        1
      );
      const mealExistsInSlot = destinationDay.some(
        item => item.mealSlot === destMealSlot
      );

      if (!destMealSlot || !destDayId || !sourceDayId) {
        toast({
          title: "You have missed the slot!",
          description: "Drop into the slot, please",
          variant: "subtle",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
        return;
      }

      if (!mealExistsInSlot) {
        movedItem.mealSlot = destMealSlot;
        if (sourceDayId === destDayId) {
          sourceDay.splice(destination.index, 0, movedItem);

          setDays(prevDays => ({
            ...prevDays,
            [sourceDayId]: {
              ...prevDays[sourceDayId],
              recipes: sourceDay
            }
          }));
        } else {
          destinationDay.splice(destination.index, 0, movedItem);

          setDays(prevDays => ({
            ...prevDays,
            [sourceDayId]: {
              ...prevDays[sourceDayId],
              recipes: sourceDay
            },
            [destDayId]: {
              ...prevDays[destDayId],
              recipes: destinationDay
            }
          }));
        }

        const data = {
          _id: movedItem.mealId,
          recipeId: movedItem.id,
          dayOfWeek: destDayId,
          mealSlot: movedItem.mealSlot
        };

        updateMealPlan(data)
          .then(response => {
            const updatedMealPlan = response.data; 

            setDays(prevDays => {
              const updatedSourceDay = [...prevDays[sourceDayId]?.recipes];
              const updatedDestinationDay = [...prevDays[destDayId]?.recipes];

              const sourceDayIndex = updatedSourceDay.findIndex(
                item => item.mealSlot === sourceMealSlot
              );
              if (sourceDayIndex !== -1) {
                updatedSourceDay.splice(sourceDayIndex, 1);
              }

              const destinationDayIndex = updatedDestinationDay.findIndex(
                item => item.mealSlot === destMealSlot
              );
              if (destinationDayIndex === -1) {
                updatedDestinationDay.push(updatedMealPlan);
              }

              return {
                ...prevDays,
                [sourceDayId]: {
                  ...prevDays[sourceDayId],
                  recipes: updatedSourceDay
                },
                [destDayId]: {
                  ...prevDays[destDayId],
                  recipes: updatedDestinationDay
                }
              };
            });
          })
          .catch(error => {
            showErrorToast(error);
          });
      } else if (mealExistsInSlot) {
        toast({
          title: "You cannot replace meals!",
          description: "Delete the meal and add a new one, please",
          variant: "subtle",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top"
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
        showErrorToast(error);
      });
  };

  const deleteAllMeals = () => {
    Object.keys(days).forEach(dayId => {
      if (dayId !== 'savedRecipes' && days[dayId]?.recipes) {
        days[dayId].recipes.forEach((recipe: PlannerRecipe) => {
          handleDelete(recipe.mealId);
        });
      }
    });
  };

  const addMealsToShoppingList = async () => {
    const allRecipes = Object.values(days).flatMap(day => day.recipes);
    const recipesWithMealId = allRecipes.filter(recipe => recipe.mealId);
    const recipeIds = recipesWithMealId.map(recipe => recipe.mealId);

    for (const id of recipeIds) {
      try {
        const response = await saveRecipeIngredientsToShoppingList(id);
        console.log(response);
      } catch (error) {
        showErrorToast(error as Error);
      }
    }
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
          <Button onClick={deleteAllMeals}>
            Clear all
          </Button>
          <Button onClick={addMealsToShoppingList}>
            Add to list
          </Button>
        </GridItem>
        <GridItem
          colSpan={{ base: 1, md: 1 }}
          bg="lightGray"
          display="flex"
          flexDirection="column"
          justifyContent="center">
          <Center p="1" fontSize="20">
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
                                  width="100%"
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
                          );
                        }
                      )}

                    {dayId !== "savedRecipes" &&
                      days[dayId]?.meals?.map(mealSlot => (
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
                                        return (
                                          <Draggable
                                            key={`${item.id}-${mealSlot}-${item.mealId}`}
                                            draggableId={`${dayId}-${mealSlot}-${item.mealId}`}
                                            index={index}>
                                            {(providedDraggable, snapshot) => (
                                              <div
                                                onMouseEnter={() =>
                                                  onMouseEnter(item.mealId)
                                                }
                                                onMouseLeave={() =>
                                                  onMouseLeave(item.mealId)
                                                }>
                                                <Container
                                                  ref={
                                                    providedDraggable.innerRef
                                                  }
                                                  {...providedDraggable.draggableProps}
                                                  {...providedDraggable.dragHandleProps}
                                                  {...providedDraggable
                                                    .draggableProps.style}
                                                  opacity={
                                                    snapshot.isDragging
                                                      ? 0.7
                                                      : 1
                                                  }
                                                  transition={
                                                    snapshot.isDragging
                                                      ? "none"
                                                      : "opacity 0.2s ease"
                                                  }
                                                  width="100%"
                                                  height="70px"
                                                  position="relative"
                                                  >
                                                  <Flex
                                                    mt="0.1rem"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    flexDirection="column">
                                                    <Center>
                                                      <Image
                                                        mt="0.2rem"
                                                        src={item.image}
                                                        alt={item.name}
                                                        w="100px"
                                                        h="50px"
                                                        objectFit="cover"
                                                      />
                                                    </Center>
                                                    <Center>
                                                      <Text
                                                        fontWeight="normal"
                                                        textAlign="center"
                                                        fontSize="xs"
                                                        ml="0"
                                                        >
                                                        {item.name}
                                                      </Text>
                                                    </Center>
                                                    {isHovering[item.mealId] && (
                                                      <IconButton
                                                        aria-label="Delete recipe"
                                                        icon={<CloseIcon />}
                                                        style={{
                                                          position: 'absolute',  
                                                          top: '-3.5px', 
                                                          right: '-3.5px',  
                                                          opacity: isHovering
                                                            ? 1
                                                            : 0,
                                                          transition:
                                                            "opacity 0.3s ease-in-out"
                                                        }}
                                                        mr="0rem"
                                                        size="xs"
                                                        onClick={() =>
                                                          handleDelete(
                                                            item.mealId
                                                          )
                                                        }
                                                      />
                                                    )}
                                                  </Flex>
                                                </Container>
                                              </div>
                                            )}
                                          </Draggable>
                                        );
                                      }
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
