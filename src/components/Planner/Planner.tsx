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
  Tooltip,
  Flex,
  Box,
  Button,
  Heading,
  FormControl,
  Input
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
  PlannerRecipe,
  SavedRecipe
} from "../../utils/types";
import { CloseIcon } from "@chakra-ui/icons";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const Planner = () => {
  const [days, setDays] = useState<PlannerDays<PlannerRecipe>>({
    savedRecipes: {
      sortOrder: 0,
      recipes: []
    },
    Sunday: {
      name: "Sunday",
      sortOrder: 1,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Monday: {
      name: "Monday",
      sortOrder: 2,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Tuesday: {
      name: "Tuesday",
      sortOrder: 3,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Wednesday: {
      name: "Wednesday",
      sortOrder: 4,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Thursday: {
      name: "Thursday",
      sortOrder: 5,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Friday: {
      name: "Friday",
      sortOrder: 6,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    },
    Saturday: {
      name: "Saturday",
      sortOrder: 7,
      meals: ["breakfast", "lunch", "dinner"],
      recipes: []
    }
  });

  const [isHovering, setIsHovering] = useState<HoveringButtonState>({});

  const onMouseEnter = (mealId: string) => {
    setIsHovering({ ...isHovering, [mealId]: true });
  };

  const onMouseLeave = (mealId: string) => {
    setIsHovering({ ...isHovering, [mealId]: false });
  };
  const [recipes, setRecipes] = useState<Array<SavedRecipe>>([]);
  const [search, setSearch] = useState("");
  const borderColor = "2px solid #d7da5e";

  const navigate = useNavigate();
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
  // derivative state to filter recipe by search parameters
  const searchedRecipes = recipes.filter((recipe: SavedRecipe) => {
    const searchItems = search
      .trim()
      .toLowerCase()
      .split(/,| /i)
      .filter(el => el !== "");
    const nameMatch = searchItems.some(param =>
      recipe.recipeName.toLowerCase().includes(param)
    );
    const ingredientMatch = recipe.recipeIngredients.some(ingredient =>
      searchItems.some(param =>
        ingredient.ingredientName.toLowerCase().includes(param)
      )
    );

    return nameMatch || ingredientMatch;
  });

  useEffect(() => {
    getRecipe()
      .then(response => {
        setRecipes(response.data.recipes);
        const savedRecipesItems = response.data.recipes.map(
          (recipe: PlannerRecipe, index: number) => ({
            ...recipe,
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
          savedRecipes: {
            ...prevDays.savedRecipes,
            recipes: savedRecipesItems
          }
        }));
      })
      .catch(error => {
        showErrorToast(error);
      });
  }, [showErrorToast]);

  //updating list of recipes according to search
  useEffect(() => {
    const filteredRecipes = () => {
      if (search === "") {
        return recipes;
      } else {
        return searchedRecipes;
      }
    };
    const savedRecipesItems: PlannerRecipe[] = filteredRecipes().map(
      (recipe: SavedRecipe, index: number) => ({
        ...recipe,
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
      savedRecipes: {
        ...prevDays.savedRecipes,
        recipes: savedRecipesItems
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    // exit if no saved recipes are available
    if (!days.savedRecipes || days.savedRecipes.recipes.length === 0) {
      return;
    }
    getAllMealPlan()
      .then(response => {
        const fetchedMealPlans = response.data.mealPlans;
        setDays(prevDays => {
          let isChanged = false;
          let updatedDays = { ...prevDays };
          //looping through each fetched meal plan to find the matching recipe in savedRecipes by recipeId
          //to display it on page as we do not get names or images from this call
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
              // Initialize array
              if (!updatedDays[dayOfWeek].recipes) {
                updatedDays[dayOfWeek].recipes = [];
              }
              // Add the new meal entry to the array if its mealId is new
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
    //destructuring result object to obtain source and destination
    const { source, destination } = result;

    //if there is no destination or the meal is dragged to savedRecipes, return
    if (!destination || destination.droppableId === "savedRecipes") {
      return;
    }

    const sourceId: Id = source.droppableId;
    const destinationId: Id = destination.droppableId;

    //dragging from savedRecipes to a meal slot
    if (sourceId === "savedRecipes") {
      const sourceDay = [...days[sourceId].recipes];
      const movedItem = { ...sourceDay[source.index] };
      const [destDayId, destMealSlot] = destinationId.split("-");

      let destinationDay = [...(days[destDayId]?.recipes || [])];

      //checking if the slot is already occupied
      const mealExistsInSlot = destinationDay.some(
        item => item.mealSlot === destMealSlot
      );

      if (mealExistsInSlot) {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="2" bg="green">
                <Text textAlign="center" fontWeight="semibold" fontSize="23">
                  Slot is unavailable
                </Text>
                <Text textAlign="center" fontSize="20">
                  Choose another one
                </Text>
              </Box>
            </>
          )
        });
        return;
      }

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
      //dragging between different meal slots
    } else if (sourceId !== "savedRecipes") {
      //splitting IDs to get the day and meal slot
      const [sourceDayId, sourceMealSlot] = sourceId.split("-");
      const [destDayId, destMealSlot] = destinationId.split("-");

      const sourceDay = [...(days[sourceDayId]?.recipes || [])];
      let destinationDay = [...(days[destDayId]?.recipes || [])];

      //removing the dragged item from the source
      const [movedItem] = sourceDay.splice(
        sourceDay.findIndex(item => item.mealSlot === sourceMealSlot),
        1
      );

      //checking if the slot is already occupied
      const mealExistsInSlot = destinationDay.some(
        item => item.mealSlot === destMealSlot
      );

      //handling different drag and drop scenarios when user drops not into the slot
      if (!destMealSlot || !destDayId || !sourceDayId) {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="2" bg="green">
                <Text textAlign="center" fontWeight="semibold" fontSize="23">
                  Slot missed
                </Text>
                <Text textAlign="center" fontSize="20">
                  Drop into the designated slot
                </Text>
              </Box>
            </>
          )
        });
        return;
      }
      //if there is no meal in slot, allow dragging there
      if (!mealExistsInSlot) {
        movedItem.mealSlot = destMealSlot;

        //if the source and destination days are the same
        //insert moved item into the same day but at the new slot
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
          //if the source and destination days are different
          //insert the moved item into the new day and slot
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
              //creating new arrays to avoid mutating state directly
              const updatedSourceDay = [...prevDays[sourceDayId]?.recipes];
              let updatedDestinationDay = [...prevDays[destDayId]?.recipes];

              //finding the index of the item to remove from source
              const sourceDayIndex = updatedSourceDay.findIndex(
                item => item.mealSlot === sourceMealSlot
              );

              //removing the item if found
              if (sourceDayIndex !== -1) {
                updatedSourceDay.splice(sourceDayIndex, 1);
              }
              //finding the index of the item to add to destination
              const destinationDayIndex = updatedDestinationDay.findIndex(
                item => item.mealSlot === destMealSlot
              );

              //adding the new item if not already present
              if (destinationDayIndex === -1) {
                updatedDestinationDay = [
                  ...updatedDestinationDay,
                  updatedMealPlan
                ];
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
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="2" bg="green">
                <Text textAlign="center" fontWeight="semibold" fontSize="23">
                  Slot is unavailable
                </Text>
                <Text textAlign="center" fontSize="20">
                  Choose another one
                </Text>
              </Box>
            </>
          )
        });
      }
    }
  };

  const handleDelete = (mealId: string) => {
    deleteMealPlan(mealId)
      .then(() => {
        setDays(prevDays => {
          const updatedDays = { ...prevDays };
          //updating the state after deleting a meal
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
      //deleting all meals in the meal plan one by one
      if (dayId !== "savedRecipes" && days[dayId]?.recipes) {
        days[dayId].recipes.forEach((recipe: PlannerRecipe) => {
          handleDelete(recipe.mealId);
        });
      }
    });
  };

  const addMealsToShoppingList = async () => {
    //adding meals' ingredients to the shopping list
    //we add by recipeIds so we need to extract them and send one by one
    const allRecipes = Object.values(days).flatMap(day => day.recipes);
    //we need only those that have also mealId so that we do not count recipes in savedRecipes
    const recipesWithMeal = allRecipes.filter(recipe => recipe.mealId);
    const recipeIdAndServings = recipesWithMeal.map(recipe => {
      return [recipe.id, recipe.recipeServings];
    });
    let allSuccessful = true;
    for (const idAndServings of recipeIdAndServings) {
      let id = idAndServings[0].toString();
      let servingSize = Number(idAndServings[1]);
      try {
        await saveRecipeIngredientsToShoppingList(id, servingSize);
      } catch (error) {
        allSuccessful = false;
        showErrorToast(error as Error);
      }
    }
    if (allSuccessful) {
      navigate("/shopping-list");
    }
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Grid
        mt="5"
        templateColumns={{
          base: "repeat(7, 1fr)",
          lg: "repeat(8, 1fr)"
        }}>
        <GridItem
          colSpan={{ base: 7, sm: 7, md: 8, lg: 8, xl: 8 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="brandGray"
          p={{ sm: "3" }}>
          <Heading>Menu Planner</Heading>
        </GridItem>
        <GridItem
          colSpan={{ base: 7, sm: 7, md: 8, lg: 8, xl: 8 }}
          display="flex"
          alignItems="center"
          flexDirection={{ base: "column-reverse", sm: "row" }}
          bg="brandGray"
          p="3">
          <Flex alignItems="center" mb={{ sm: "3" }} flexGrow={1}>
            <FormControl ml="5">
              <Input
                size="xs"
                width="auto"
                overflow="hidden"
                type="text"
                placeholder="Enter name/ingredients"
                id="search"
                variant="outline"
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
              <IconButton
                aria-label="Cancel search"
                icon={<CloseIcon />}
                size="xs"
                ml="2"
                onClick={() => {
                  setSearch("");
                }}
              />
            </FormControl>
          </Flex>
          <Flex
            justifyContent={{ base: "center", sm: "flex-end" }}
            gap={{ md: "5" }}
            pb="3"
            alignItems="center">
            <Tooltip
              label="Add ingredients to the shopping list"
              aria-label="A tooltip"
              bg="green"
              color="black"
              fontSize="sm"
              placement="top-start">
              <IconButton
                mr={{ base: "0", sm: "10" }}
                _hover={{ bg: "none", transform: "scale(1.2)" }}
                transition="transform 0.2s ease-in-out"
                size="xl"
                variant="ghost"
                aria-label="Add ingredients to the shopping list"
                title="Add to shopping list"
                icon={<GiShoppingCart style={{ fontSize: "35px" }} />}
                onClick={addMealsToShoppingList}
              />
            </Tooltip>
            <Button
              mr={{ base: "0", sm: "5" }}
              overflow="hidden"
              onClick={deleteAllMeals}>
              Clear all
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{
          base: "repeat(8, 1fr)",
          lg: "repeat(8, 1fr)"
        }}
        padding="16px"
        bg="lightGray"
        overflowX="auto"
        maxHeight={{
          base: "45rem",
          sm: "40rem",
          md: "50rem"
        }}
        position="relative">
        {Object.keys(days)
          .sort((a, b) => days[a].sortOrder - days[b].sortOrder)
          .map((dayId, index) => (
            <GridItem
              key={dayId}
              colSpan={{ base: 1, md: 1 }}
              overflowY={dayId === "savedRecipes" ? "scroll" : "hidden"}
              position="relative"
              zIndex={dayId === "savedRecipes" ? "10" : "5"}
              minWidth="180px"
              maxHeight={{
                base: "30rem",
                sm: "40rem",
                md: "36rem",
                lg: "40rem"
              }}
              style={
                dayId === "savedRecipes"
                  ? { position: "sticky", top: "0px", left: "0px" }
                  : {}
              }
              borderRight={index !== 0 && index !== 7 ? borderColor : "none"}>
              <Droppable droppableId={dayId} direction="vertical">
                {provided => (
                  <Container
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {dayId === "savedRecipes" &&
                      days[dayId].recipes.map(
                        (item: PlannerRecipe, index: number) => {
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
                                  bg={"brandGray"}
                                  border={borderColor}
                                  borderRadius="0"
                                  padding="0.5rem"
                                  mt="0.03rem"
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
                    <GridItem
                      key={index}
                      colSpan={{ base: 1, md: 1 }}
                      bg="customGray"
                      textAlign="center"
                      p="2"
                      color="brandGray"
                      fontSize="20"
                      style={
                        dayId === "savedRecipes" ? { display: "none" } : {}
                      }
                      mb="4">
                      {days[dayId]?.name}
                    </GridItem>
                    {dayId !== "savedRecipes" &&
                      days[dayId]?.meals?.map(mealSlot => (
                        <React.Fragment key={mealSlot}>
                          <Box
                            p="1"
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
                                mt="0.5rem"
                                mb="0.5rem"
                                p="0.5rem"
                                minHeight={{
                                  base: "70px",
                                  sm: "120px",
                                  md: "120px",
                                  lg: "130px"
                                }}
                                maxHeight={{
                                  base: "70px",
                                  sm: "120px",
                                  md: "120px",
                                  lg: "130px"
                                }}
                                position="relative">
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
                                                  onMouseEnter(item.mealId!)
                                                }
                                                onMouseLeave={() =>
                                                  onMouseLeave(item.mealId!)
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
                                                  h={{
                                                    base: "20px",
                                                    sm: "50px",
                                                    md: "70px"
                                                  }}
                                                  position="absolute">
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
                                                        display={{
                                                          base: "none",
                                                          sm: "none",
                                                          md: "block"
                                                        }}
                                                      />
                                                    </Center>
                                                    <Center>
                                                      <Text
                                                        fontWeight="normal"
                                                        textAlign="center"
                                                        fontSize="xs"
                                                        ml="0">
                                                        {item.name}
                                                      </Text>
                                                    </Center>
                                                    {isHovering[
                                                      item.mealId!
                                                    ] && (
                                                      <IconButton
                                                        aria-label="Delete recipe"
                                                        icon={<CloseIcon />}
                                                        style={{
                                                          position: "absolute",
                                                          top: "-3.5px",
                                                          right: "-3.5px",
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
                                                            item.mealId!
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
