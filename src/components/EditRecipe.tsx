import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleRecipe, editSingleRecipe } from "../utils/fetchData";
import { SavedRecipe, SavedIngredient, RecipeTag } from "../utils/types";

const EditRecipe = () => {
  const [recipe, setRecipe] = useState<SavedRecipe | null>(null);
  const [ingredients, setIngredients] = useState<Array<SavedIngredient> | null>(
    null
  );
  const [tags, setTags] = useState<Array<RecipeTag> | null>(null);
  const [diets, setDiets] = useState<Array<string> | null>(null);
  const { slug } = useParams();
  const recipeId = slug;
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (recipeId === undefined) return;
    getSingleRecipe(recipeId)
      .then(response => {
        setRecipe(response.data);
        setIngredients(
          response.data.recipeIngredients.map(
            ({ _id, ...rest }: SavedIngredient) => {
              return rest;
            }
          )
        );
        setTags(
          response.data.recipeTags.map((tag: RecipeTag) => {
            return { tagName: tag.tagName };
          })
        );
        setDiets(response.data.recipeSpecialDiets);
      })
      .catch(error => {
        console.log(error);
      });
  }, [recipeId]);

  const saveRecipe = () => {
    if (recipeId === undefined) return;
    if (recipe === null) return;
    editSingleRecipe(recipeId, recipe)
      .then(response => {
        navigate(`/saved-recipes/${recipeId}`);
      })
      .catch(error => {
        toast({
          title: "Error",
          description: "Server wasn't be able to edit your recipe",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      });
  };

  if (recipe === null) return null;
  if (ingredients === null) return null;
  if (tags === null) return null;
  if (diets === null) return null;

  const handleInputAdd = (arg: string) => {
    if (arg === "ingredients") {
      setIngredients([
        ...ingredients,
        {
          ingredientName: "",
          ingredientAmount: 0,
          ingredientUnit: ""
        }
      ]);
    }
    if (arg === "tags") {
      setTags([
        ...tags,
        {
          tagName: ""
        }
      ]);
    }
    if (arg === "diets") {
      setDiets([...diets, ""]);
    }
  };

  const handleInputRemove = (arg: string, index: number) => {
    if (arg === "ingredients") {
      const values = [...ingredients];
      values.splice(index, 1);
      setIngredients(values);
    }
    if (arg === "tags") {
      const values = [...tags];
      values.splice(index, 1);
      setTags(values);
    }
    if (arg === "diets") {
      const values = [...diets];
      values.splice(index, 1);
      setDiets(values);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={e => {
        e.preventDefault();
        saveRecipe();
      }}>
      <Container maxW="5xl">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} marginTop="10">
          <GridItem colSpan={2} w="100%">
            <Heading as="h3">Edit your recipe</Heading>
          </GridItem>
          <GridItem colSpan={1} w="100%" position="relative">
            <Flex
              w="100%"
              gap="2"
              flexShrink="1"
              flexWrap="wrap"
              position="absolute"
              bottom="2"
              justifyContent="center">
              <IconButton
                size="lg"
                variant="outline"
                aria-label="Edit recipe"
                icon={<CheckIcon />}
                title="edit recipe"
                type="submit"
                onClick={saveRecipe}
              />
              <IconButton
                size="lg"
                variant="outline"
                aria-label="Do not edit the recipe"
                icon={<CloseIcon />}
                title="Cancel"
                onClick={() => {
                  navigate(`/saved-recipes/${recipeId}`);
                }}
              />
            </Flex>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={2} w="95%">
            <Flex flexDirection="column">
              <Box marginTop="10" alignItems="center" gap={2}>
                <FormControl w="70%" marginY="5">
                  <FormLabel>
                    <b>Recipe name</b>
                  </FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    value={recipe.recipeName}
                    onChange={e => {
                      setRecipe({
                        ...recipe,
                        recipeName: e.target.value
                      });
                    }}
                  />
                </FormControl>
                <FormControl w="70%" marginY="7">
                  <FormLabel>
                    <b>Recipe category</b>
                  </FormLabel>
                  <Select
                    size="sm"
                    value={recipe.recipeCategory}
                    placeholder="Choose category"
                    onChange={e => {
                      setRecipe({
                        ...recipe,
                        recipeCategory: e.target.value
                      });
                    }}>
                    <option value="Main Dish">Main Dish</option>
                    <option value="Snack">Snack</option>
                    <option value="Soup">Soup</option>
                    <option value="Cream Soup">Cream Soup</option>
                    <option value="Cocktail">Cocktail</option>
                    <option value="Salad">Salad</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Kids Menu">Kids Menu</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Picnic Ideas">Picnic Ideas</option>
                    <option value="Smoothy">Smoothie</option>
                    <option value="Party Menu">Party Menu</option>
                  </Select>
                </FormControl>
              </Box>
              <Flex marginY="2">
                <FormControl>
                  <FormLabel>
                    <b>Prep time</b>
                  </FormLabel>
                  <InputGroup w="50%">
                    <Input
                      size="sm"
                      type="number"
                      value={recipe.recipePrepTime.recipePrepTimeMinutes || ""}
                      onChange={e => {
                        setRecipe({
                          ...recipe,
                          recipePrepTime: {
                            recipePrepTimeMinutes: Number(e.target.value)
                          }
                        });
                      }}
                    />
                    <InputRightElement>
                      <Text fontSize="12">min</Text>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <b>Cooking time</b>
                  </FormLabel>
                  <InputGroup w="50%">
                    <Input
                      size="sm"
                      type="number"
                      value={recipe.recipeCookTime.recipeCookTimeMinutes || ""}
                      onChange={e => {
                        setRecipe({
                          ...recipe,
                          recipeCookTime: {
                            recipeCookTimeMinutes: Number(e.target.value)
                          }
                        });
                      }}
                    />
                    <InputRightElement>
                      <Text fontSize="12">min</Text>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Flex>
              <Flex marginY="2">
                <FormControl>
                  <FormLabel>
                    <b>Complexity level</b>
                  </FormLabel>
                  <Select
                    w="50%"
                    size="sm"
                    value={recipe.recipeComplexityLevel}
                    placeholder="Choose complexity level"
                    onChange={e => {
                      setRecipe({
                        ...recipe,
                        recipeComplexityLevel: e.target.value
                      });
                    }}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="difficult">difficult</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <b>Servings</b>
                  </FormLabel>
                  <InputGroup w="50%">
                    <Input
                      size="sm"
                      value={recipe.recipeServings || ""}
                      onChange={e => {
                        setRecipe({
                          ...recipe,
                          recipeServings: Number(e.target.value)
                        });
                      }}
                    />
                    <InputRightElement marginRight="5">
                      <Text fontSize="12">persons</Text>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Flex>
              <Box>
                <Flex marginY="5">
                  <Text marginRight="2">
                    <b>Ingredients</b>
                  </Text>
                  <IconButton
                    size="sm"
                    variant="outline"
                    aria-label="add ingredient"
                    icon={<AddIcon />}
                    title="add ingredient"
                    onClick={() => handleInputAdd("ingredients")}
                  />
                </Flex>
                <Flex justifyContent="center">
                  <Text w="50%">
                    <i>ingredient</i>
                  </Text>
                  <Text w="22%">
                    <i>amount</i>
                  </Text>
                  <Text w="28%">
                    <i>unit</i>
                  </Text>
                </Flex>
                {ingredients.map((ingredient, index) => (
                  <Flex key={index}>
                    <FormControl marginRight="3">
                      <FormLabel></FormLabel>
                      <Input
                        size="sm"
                        name="ingredientName"
                        type="text"
                        value={ingredient.ingredientName}
                        onChange={e => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].ingredientName = e.target.value;
                          setIngredients(newIngredients);
                          setRecipe({
                            ...recipe,
                            recipeIngredients: newIngredients
                          });
                        }}
                      />
                    </FormControl>
                    <FormControl w="40%" marginRight="3">
                      <FormLabel></FormLabel>
                      <Input
                        size="sm"
                        name="ingredientAmount"
                        type="number"
                        value={ingredient.ingredientAmount || ""}
                        onChange={e => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].ingredientAmount = Number(
                            e.target.value
                          );
                          setIngredients(newIngredients);
                          setRecipe({
                            ...recipe,
                            recipeIngredients: newIngredients
                          });
                        }}
                      />
                    </FormControl>
                    <FormControl marginRight="1" w="40%">
                      <FormLabel></FormLabel>
                      <Select
                        size="sm"
                        value={ingredient.ingredientUnit}
                        placeholder={ingredient.ingredientUnit}
                        onChange={e => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].ingredientUnit = e.target.value;
                          setIngredients(newIngredients);
                          setRecipe({
                            ...recipe,
                            recipeIngredients: newIngredients
                          });
                        }}>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="lbs">lbs</option>
                        <option value="cup">cup</option>
                        <option value="cups">cups</option>
                        <option value="tsp">tsp</option>
                        <option value="tbsp">tbsp</option>
                        <option value="cloves">cloves</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="medium">medium</option>
                        <option value="pinch">pinch</option>
                        <option value="other">other </option>
                      </Select>
                    </FormControl>
                    <IconButton
                      size="sm"
                      variant="outline"
                      aria-label="remove ingredient"
                      icon={<MinusIcon />}
                      title="remove ingredient"
                      margin="2"
                      onClick={() => handleInputRemove("ingredients", index)}
                    />
                  </Flex>
                ))}
              </Box>
              <Box marginY="5">
                <FormControl>
                  <FormLabel>
                    <Text>
                      <b>Instructions</b>
                    </Text>
                  </FormLabel>
                  <Textarea
                    value={recipe.recipeInstructions}
                    size="md"
                    onChange={e => {
                      setRecipe({
                        ...recipe,
                        recipeInstructions: e.target.value
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Box marginY="5">
                <Text>
                  <b>Nutrition Information</b>
                </Text>
                <Flex>
                  <FormControl marginRight="2" w="20%">
                    <FormLabel>
                      <i>Calories</i>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        size="sm"
                        type="number"
                        value={
                          recipe.recipeNutritionInfo.NutritionInfoCalories || ""
                        }
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipeNutritionInfo: {
                              ...recipe.recipeNutritionInfo,
                              NutritionInfoCalories: Number(e.target.value)
                            }
                          });
                        }}
                      />
                      <InputRightElement>
                        <Text fontSize="12">kcal</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl marginRight="2" w="20%">
                    <FormLabel>
                      <i>Carbs</i>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        size="sm"
                        type="number"
                        value={
                          recipe.recipeNutritionInfo.NutritionInfoCarbs || ""
                        }
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipeNutritionInfo: {
                              ...recipe.recipeNutritionInfo,
                              NutritionInfoCarbs: Number(e.target.value)
                            }
                          });
                        }}
                      />
                      <InputRightElement>
                        <Text fontSize="12">g</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl marginRight="2" w="20%">
                    <FormLabel>
                      <i>Protein</i>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        size="sm"
                        type="number"
                        value={
                          recipe.recipeNutritionInfo.NutritionInfoProtein || ""
                        }
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipeNutritionInfo: {
                              ...recipe.recipeNutritionInfo,
                              NutritionInfoProtein: Number(e.target.value)
                            }
                          });
                        }}
                      />
                      <InputRightElement>
                        <Text fontSize="12">g</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl marginRight="2" w="20  %">
                    <FormLabel>
                      <i>Fat</i>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        size="sm"
                        type="number"
                        value={
                          recipe.recipeNutritionInfo.NutritionInfoFat || ""
                        }
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipeNutritionInfo: {
                              ...recipe.recipeNutritionInfo,
                              NutritionInfoFat: Number(e.target.value)
                            }
                          });
                        }}
                      />
                      <InputRightElement>
                        <Text fontSize="12">g</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Flex>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={1} w="100%">
            <Image w="100%" src={recipe.recipeImage} alt={recipe.recipeName} />
            <Flex marginY="7">
              <Text marginRight="2">
                <b>Tags</b>
              </Text>
              <IconButton
                size="sm"
                variant="outline"
                aria-label="add tag"
                icon={<AddIcon />}
                title="add tag"
                onClick={() => handleInputAdd("tags")}
              />
            </Flex>
            {tags.map((tag, index) => (
              <Flex key={index}>
                <FormControl marginRight="1">
                  <FormLabel></FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    value={tag.tagName}
                    onChange={e => {
                      const newTags = [...tags];
                      newTags[index].tagName = e.target.value;
                      setTags(newTags);
                      setRecipe({
                        ...recipe,
                        recipeTags: newTags
                      });
                    }}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <IconButton
                  size="sm"
                  variant="outline"
                  aria-label="remove ingredient"
                  icon={<MinusIcon />}
                  title="remove ingredient"
                  margin="2"
                  onClick={() => handleInputRemove("tags", index)}
                />
              </Flex>
            ))}
            <Flex marginY="5">
              <Text marginRight="2">
                <b>Special diets</b>
              </Text>
              <IconButton
                size="sm"
                variant="outline"
                aria-label="add diet"
                icon={<AddIcon />}
                title="add diet"
                onClick={() => handleInputAdd("diets")}
              />
            </Flex>
            {diets.map((diet, index) => (
              <Flex key={index}>
                <FormControl marginRight="1">
                  <FormLabel></FormLabel>
                  <Select
                    size="sm"
                    placeholder="Choose diet"
                    value={diet}
                    onChange={e => {
                      const newDiets = [...diets];
                      newDiets[index] = e.target.value;
                      setDiets(newDiets);
                      setRecipe({
                        ...recipe,
                        recipeSpecialDiets: newDiets
                      });
                    }}>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Gluten-free">Gluten-free</option>
                    <option value="Pork-free">Pork-free</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-free">Gluten-free</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Diabetes Friendly">Diabetes Friendly</option>
                    <option value="Low Carb">Low Carb</option>
                    <option value="Keto">Keto</option>
                    <option value="Low Calorie">Low Calorie</option>
                    <option value="Lactose Free">Lactose Free</option>
                    <option value="Dairy Free">Dairy Free</option>
                    <option value="Soy Free">Soy Free</option>
                    <option value="None">None</option>
                  </Select>
                </FormControl>
                <IconButton
                  size="sm"
                  variant="outline"
                  aria-label="remove ingredient"
                  icon={<MinusIcon />}
                  title="remove ingredient"
                  margin="2"
                  onClick={() => handleInputRemove("diets", index)}
                />
              </Flex>
            ))}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default EditRecipe;
