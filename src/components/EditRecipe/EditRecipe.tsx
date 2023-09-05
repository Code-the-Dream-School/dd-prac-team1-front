import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  IconButton,
  Image as ChakraImage,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
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
import { getSingleRecipe, editSingleRecipe } from "../../utils/fetchData";
import {
  SavedRecipe,
  SavedIngredient,
  RecipeTag,
  EditedRecipe
} from "../../utils/types";
import IngredientAmountHandle from "./IngredientAmountHandle";

const EditRecipe = () => {
  const [recipe, setRecipe] = useState<SavedRecipe | EditedRecipe | null>(null);
  const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([]);
  const [tags, setTags] = useState<Array<RecipeTag>>([]);
  const [diets, setDiets] = useState<Array<string>>([]);
  const [editSrcImage, setEditSrcImage] = useState<string>("");
  const nativeFilePickerRef = useRef<HTMLInputElement>(null);
  const { slug } = useParams();
  const recipeId = slug;
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (recipeId === undefined) return;
    getSingleRecipe(recipeId)
      .then(response => {
        setRecipe(response.data);
        setEditSrcImage(response.data.recipeImage);
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const saveRecipe = () => {
    if (recipeId === undefined) return;
    if (recipe === null) return;
    editSingleRecipe(recipeId, recipe)
      .then(response => {
        console.log(response);
        navigate(`/saved-recipes/${recipeId}`);
      })
      .catch(error => {
        console.log(error);
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
      });
  };

  if (recipe === null) return null;

  const handleInputAdd = (arg: string) => {
    if (arg === "ingredients") {
      setIngredients([
        {
          ingredientName: "",
          ingredientAmount: 0,
          ingredientUnit: "other"
        },
        ...ingredients
      ]);
    }
    if (arg === "tags") {
      setTags([
        {
          tagName: ""
        },
        ...tags
      ]);
    }
    if (arg === "diets") {
      setDiets(["", ...diets]);
    }
  };

  const handleInputRemove = (arg: string, index: number) => {
    if (arg === "ingredients") {
      const values = [...ingredients];
      values.splice(index, 1);
      setIngredients(values);
      setRecipe({ ...recipe, recipeIngredients: values });
    }
    if (arg === "tags") {
      const values = [...tags];
      values.splice(index, 1);
      setTags(values);
      if (values.length === 0) {
        setRecipe({ ...recipe, recipeTags: "" });
      } else {
        setRecipe({ ...recipe, recipeTags: values });
      }
    }
    if (arg === "diets") {
      const values = [...diets];
      values.splice(index, 1);
      setDiets(values);
      console.log(diets);
      if (values.length === 0) {
        setRecipe({ ...recipe, recipeSpecialDiets: "" });
      } else {
        setRecipe({ ...recipe, recipeSpecialDiets: values });
      }
    }
  };

  return (
    <Box
      as="form"
      onSubmit={(e: any) => {
        e.preventDefault();
        saveRecipe();
      }}>
      <Container maxW="5xl">
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap="2"
          mt="10"
          h={{ base: "150", sm: "70" }}>
          <GridItem
            colSpan={{ base: 2, sm: 1, md: 2 }}
            w="100%"
            display={{ base: "flex", sm: "grid" }}
            justifyContent="center"
            alignItems="center">
            <Heading as="h3">Edit your recipe</Heading>
          </GridItem>
          <GridItem
            colSpan={{ base: 2, sm: 1, md: 1 }}
            w="100%"
            position="relative"
            display={{ base: "flex", sm: "grid" }}
            justifyContent="center"
            alignItems="center">
            <Flex
              w="100%"
              gap="2"
              flexShrink="1"
              flexWrap="wrap"
              position="absolute"
              justifyContent="center">
              <IconButton
                size="lg"
                variant="outline"
                aria-label="Edit recipe"
                icon={<CheckIcon />}
                title="edit recipe"
                type="submit"
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
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap="2">
          <GridItem colSpan={{ base: 2, sm: 1, md: 2 }} w="100%">
            <Flex flexDirection="column">
              <FormControl
                w={{ base: "100%", sm: "85%" }}
                marginY="5"
                pr={{ base: "15px", sm: "0" }}
                mt={{ sm: "10" }}
                alignItems="center"
                gap={{ sm: "2" }}>
                <FormLabel>
                  <b>Recipe name</b>
                </FormLabel>
                <Input
                  isRequired
                  size="sm"
                  type="text"
                  placeholder="recipe name is required"
                  value={recipe.recipeName}
                  onChange={e => {
                    setRecipe({
                      ...recipe,
                      recipeName: e.target.value
                    });
                  }}
                />
              </FormControl>
              <FormControl
                w={{ base: "100%", sm: "85%" }}
                marginY="5"
                pr={{ base: "15px", sm: "0" }}>
                <FormLabel>
                  <b>Recipe category</b>
                </FormLabel>
                <Select
                  isRequired
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
                  <option value="Smoothie">Smoothie</option>
                  <option value="Party Menu">Party Menu</option>
                </Select>
              </FormControl>
              <Grid templateColumns="repeat(2, 1fr)" gap="2">
                <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
                  <FormControl>
                    <FormLabel>
                      <b>Prep time</b>
                    </FormLabel>
                    <InputGroup w={{ base: "95%", md: "70%" }}>
                      <Input
                        size="sm"
                        type="number"
                        value={
                          recipe.recipePrepTime.recipePrepTimeMinutes || ""
                        }
                        min="0"
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipePrepTime: {
                              recipePrepTimeMinutes: Number(e.target.value)
                            },
                            recipeTotalTime: {
                              recipeTotalTimeMinutes:
                                Number(e.target.value) +
                                recipe.recipeCookTime.recipeCookTimeMinutes
                            }
                          });
                          console.log(recipe);
                        }}
                      />
                      <InputRightElement>
                        <Text fontSize="12">min</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl mt="5">
                    <FormLabel>
                      <b>Complexity level</b>
                    </FormLabel>
                    <Select
                      w={{ base: "95%", md: "70%" }}
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
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
                  <FormControl>
                    <FormLabel>
                      <b>Cooking time</b>
                    </FormLabel>
                    <InputGroup w={{ base: "95%", md: "70%" }}>
                      <Input
                        size="sm"
                        type="number"
                        value={
                          recipe.recipeCookTime.recipeCookTimeMinutes || ""
                        }
                        min="0"
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipeCookTime: {
                              recipeCookTimeMinutes: Number(e.target.value)
                            },
                            recipeTotalTime: {
                              recipeTotalTimeMinutes:
                                Number(e.target.value) +
                                recipe.recipePrepTime.recipePrepTimeMinutes
                            }
                          });
                          console.log(recipe);
                        }}
                      />
                      <InputRightElement>
                        <Text fontSize="12">min</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl mt="5">
                    <FormLabel>
                      <b>Servings</b>
                    </FormLabel>
                    <InputGroup w={{ base: "95%", md: "70%" }}>
                      <Input
                        size="sm"
                        value={recipe.recipeServings || ""}
                        min="0"
                        onChange={e => {
                          setRecipe({
                            ...recipe,
                            recipeServings: Number(e.target.value)
                          });
                        }}
                      />
                      <InputRightElement mr="5">
                        <Text fontSize="12">persons</Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </Grid>
              <Flex flexDirection="column" gap="4">
                <Flex mt="5" alignItems="center">
                  <Text mr="2">
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
                <Grid
                  templateColumns={{
                    base: "repeat(11, 1fr)",
                    md: "repeat(12, 1fr)"
                  }}
                  gap={{ base: 1, lg: 6 }}>
                  <GridItem
                    colSpan={{ lg: 3 }}
                    textAlign={{ lg: "center" }}
                    display={{ base: "none", lg: "block" }}
                    w="100%">
                    <Text>
                      <i>ingredient</i>
                    </Text>
                  </GridItem>
                  <GridItem
                    colSpan={{ lg: 4 }}
                    textAlign={{ lg: "center" }}
                    display={{ base: "none", lg: "block" }}
                    w="100%">
                    <Text>
                      <i>amount</i>
                    </Text>
                  </GridItem>
                  <GridItem
                    colSpan={{ lg: 4 }}
                    textAlign={{ lg: "center" }}
                    display={{ base: "none", lg: "block" }}
                    w="100%">
                    <Text>
                      <i>unit</i>
                    </Text>
                  </GridItem>
                </Grid>

                {ingredients.map((ingredient, index) => (
                  <Grid
                    templateColumns={{
                      base: "repeat(11, 1fr)",
                      lg: "repeat(12, 1fr)"
                    }}
                    w="95%"
                    gap="2"
                    mb={{ base: "2", md: "0" }}
                    key={index}>
                    <GridItem colSpan={{ base: 11, md: 10, lg: 3 }} w="100%">
                      <FormControl w="100%">
                        <Input
                          isRequired
                          size="sm"
                          name="ingredientName"
                          type="text"
                          placeholder="ingredient name is required"
                          value={ingredient.ingredientName}
                          onChange={e => {
                            const newIngredients = [...ingredients];
                            newIngredients[index].ingredientName =
                              e.target.value;
                            setIngredients(newIngredients);
                            setRecipe({
                              ...recipe,
                              recipeIngredients: newIngredients
                            });
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={{ base: 11, md: 6, lg: 5 }} w="100%">
                      <IngredientAmountHandle
                        ingredient={ingredient}
                        onChange={(value: any) => {
                          const newIngredients = [...ingredients];
                          newIngredients[index].ingredientAmount = value;
                          setIngredients(newIngredients);
                          setRecipe({
                            ...recipe,
                            recipeIngredients: newIngredients
                          });
                          console.log(ingredients);
                          console.log(recipe);
                        }}
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 10, md: 4, lg: 3 }} w="100%">
                      {ingredient.ingredientAmount >= 0 && (
                        <FormControl mr="1" w="100%">
                          <Select
                            isRequired
                            size="sm"
                            value={ingredient.ingredientUnit}
                            placeholder={ingredient.ingredientUnit}
                            onChange={e => {
                              const newIngredients = [...ingredients];
                              newIngredients[index].ingredientUnit =
                                e.target.value;
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
                      )}
                    </GridItem>
                    <GridItem colSpan={1} w="100%">
                      <IconButton
                        size="sm"
                        variant="solid"
                        aria-label="remove ingredient"
                        icon={<MinusIcon />}
                        title="remove ingredient"
                        onClick={() => handleInputRemove("ingredients", index)}
                      />
                    </GridItem>
                  </Grid>
                ))}
              </Flex>
              <Box marginY="5">
                <FormControl>
                  <FormLabel>
                    <Text>
                      <b>Instructions</b>
                    </Text>
                  </FormLabel>
                  <Textarea
                    isRequired
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
                <Grid templateColumns="repeat(4, 1fr)" mt="2" gap="2">
                  <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
                    <FormControl mr="2">
                      <FormLabel>
                        <i>Calories</i>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          size="sm"
                          type="number"
                          value={
                            recipe.recipeNutritionInfo.NutritionInfoCalories ||
                            ""
                          }
                          min="0"
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
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
                    <FormControl mr="2">
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
                          min="0"
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
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
                    <FormControl mr="2">
                      <FormLabel>
                        <i>Protein</i>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          size="sm"
                          type="number"
                          value={
                            recipe.recipeNutritionInfo.NutritionInfoProtein ||
                            ""
                          }
                          min="0"
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
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
                    <FormControl mr="2">
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
                          min="0"
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
                  </GridItem>
                </Grid>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }} w="100%">
            <ChakraImage
              w="100%"
              borderRadius="5"
              src={editSrcImage || ""}
              alt={recipe.recipeName}
              maxH="45vh"
            />
            <Flex marginY="5">
              <FormControl w="70%">
                <Input
                  size="sm"
                  ref={nativeFilePickerRef}
                  style={{ display: "none" }}
                  type="file"
                  name="recipeImage"
                  placeholder="Choose img"
                  accept="image/png, image/jpeg, image/avif"
                  onChange={e => {
                    console.log(e);
                    if (e.target.files === null) return;
                    const file = e.target.files[0];
                    const newSrc = URL.createObjectURL(file);
                    setEditSrcImage(newSrc);
                    console.log(newSrc);
                    setRecipe({
                      ...recipe,
                      recipeImage: e.target.files[0]
                    });
                    console.log(recipe);
                  }}
                />
              </FormControl>
            </Flex>
            <Button
              w="100%"
              onClick={() => {
                if (nativeFilePickerRef.current === null) return;
                nativeFilePickerRef.current.click();
              }}>
              Upload image
            </Button>
            <Center>
              <Text color="gray">
                <i>5MB max</i>
              </Text>
            </Center>
            <Flex marginY="5" alignItems="center">
              <Text mr="2">
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
              <Flex key={index} alignItems="center">
                <FormControl m="2">
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
                </FormControl>
                <IconButton
                  size="sm"
                  variant="solid"
                  aria-label="remove ingredient"
                  icon={<MinusIcon />}
                  title="remove ingredient"
                  onClick={() => handleInputRemove("tags", index)}
                />
              </Flex>
            ))}
            <Flex marginY="5" alignItems="center">
              <Text mr="2">
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
              <Flex key={index} alignItems="center">
                <FormControl m="2">
                  <Select
                    size="sm"
                    placeholder="Choose diet"
                    value={diet}
                    onChange={e => {
                      console.log(e);
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
                  variant="solid"
                  aria-label="remove ingredient"
                  icon={<MinusIcon />}
                  title="remove ingredient"
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
