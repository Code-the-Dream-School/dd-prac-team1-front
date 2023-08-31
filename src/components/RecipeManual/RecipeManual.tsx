import { Box, Center, Container, Flex, Heading } from "@chakra-ui/layout";
import {
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Input,
  Textarea,
  Text,
  Button,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MultiValue } from "chakra-react-select";
import { MinusIcon } from "@chakra-ui/icons";
import {
  categoriesOptions,
  ingredientAmountOptions
} from "../../utils/OptionsData";
import { complexityOptions } from "../../utils/OptionsData";
import { specialDietsOptions } from "../../utils/OptionsData";
import { unitOptions } from "../../utils/OptionsData";
import { SaveIngredients, ManualRecipe } from "../../utils/types";
import { saveManualRecipe } from "../../utils/fetchData";
import DropImage from "./DropImage";
import MultipleCreatableSelectForm from "./SelectForms/MultipleCreatableSelectForm";
import SingleSelectForm from "./SelectForms/SingleSelectForm";
import MultipleSelectForm from "./SelectForms/MultipleSelectForm";
import SingleCreatableSelect from "./SelectForms/SingleCreatableSelect";

const RecipeManual = () => {
  const [recipe, setRecipe] = useState<ManualRecipe>({
    recipeCategory: "Main Dish",
    recipeComplexityLevel: "medium",
    recipeCookTime: { recipeCookTimeMinutes: 0 },
    recipeImage: "",
    recipeIngredients: [
      {
        ingredientName: "",
        ingredientAmount: "",
        ingredientUnit: "other"
      },
      {
        ingredientName: "",
        ingredientAmount: "",
        ingredientUnit: "other"
      }
    ],
    recipeInstructions: "",
    recipeName: "",
    recipeNutritionInfo: {
      NutritionInfoCalories: 0,
      NutritionInfoCarbs: 0,
      NutritionInfoProtein: 0,
      NutritionInfoFat: 0
    },
    recipePrepTime: {
      recipePrepTimeMinutes: 0
    },
    recipeTotalTime: { recipeTotalTimeMinutes: 0 },
    recipeServings: 0,
    recipeSpecialDiets: [],
    recipeTags: []
  });

  const [ingredients, setIngredients] = useState<Array<SaveIngredients>>([
    {
      ingredientName: "",
      ingredientAmount: "",
      ingredientUnit: "other"
    }
  ]);

  const [srcImage, setsrcImage] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  const saveRecipe = () => {
    console.log(recipe);
    saveManualRecipe(recipe)
      .then(response => {
        console.log(response);
        navigate("/saved-recipes");
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
          duration: 4000,
          isClosable: true,
          position: "top"
        });
      });
  };

  const handleInputAdd = () => {
    setIngredients([
      ...ingredients,
      {
        ingredientName: "",
        ingredientAmount: "",
        ingredientUnit: "other"
      }
    ]);
  };

  const handleInputRemove = (index: number) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
    setRecipe({ ...recipe, recipeIngredients: values });
  };

  return (
    <Box
      as="form"
      onSubmit={(event: { preventDefault: () => void }) => {
        event.preventDefault();
        saveRecipe();
      }}>
      <Container mt="20" maxW="6xl">
        {/* <Grid
          h={{ base: "auto", md: "200px" }}
          templateRows={{
            base: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)"
          }}
          templateColumns="repeat(1, 1fr)"
          gap={4}> */}
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column">
          <Center>
            <Heading as="h1" size="lg" noOfLines={1}>
              ADD YOUR OWN RECIPE
            </Heading>
          </Center>

          {/* <GridItem colSpan={1}> */}
          <Center>
            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                value={recipe.recipeName}
                placeholder="TITLE"
                maxLength={50}
                onChange={event => {
                  setRecipe({
                    ...recipe,
                    recipeName: event.target.value
                  });
                }}
              />
            </FormControl>
          </Center>
        </Flex>
        {/* </GridItem> */}
        {/* </Grid> */}

        <Grid
          templateRows={{ base: "repeat(1, 2fr)", md: "repeat(1, 2fr)" }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(10, 1fr)" }}
          gap={4}>
          <GridItem colSpan={{ base: 1, md: 10 }}>
            <Flex
              justifyContent="start"
              alignItems="center"
              mt={{ base: "5", md: "0" }}>
              <Text>INGREDIENTS</Text>
              <Button
                ml="10px"
                size="sm"
                aria-label="add ingredient"
                title="add ingredient"
                onClick={handleInputAdd}>
                ADD
              </Button>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 6 }}>
            {ingredients.map((ingredient, id) => (
              <Grid
                h={{ md: "100px", sm: "220px" }}
                templateRows={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  sm: "repeat(5, 1fr)"
                }}
                templateColumns="repeat(10, 1fr)"
                gap={3}
                key={id}>
                <GridItem colSpan={{ base: 10, lg: 4 }}>
                  <FormControl isRequired>
                    <Input
                      type="text"
                      id={`ingredientName-${id}`}
                      name={`ingredientName-${id}`}
                      value={ingredient.ingredientName}
                      placeholder="Add ingredients"
                      // maxW={{ base: "350px", sm: "auto" }}
                      _placeholder={{ position: "absolute", fontSize: "xs" }}
                      onChange={event => {
                        const newIngredients = [...ingredients];
                        newIngredients[id].ingredientName = event.target.value;
                        setIngredients(newIngredients);
                        setRecipe({
                          ...recipe,
                          recipeIngredients: newIngredients
                        });
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 10, md: 5, lg: 3 }}>
                  <FormControl isRequired>
                    <SingleCreatableSelect
                      value={{
                        value: ingredients[id].ingredientAmount,
                        label: ingredients[id].ingredientAmount
                      }}
                      options={ingredientAmountOptions}
                      onChange={event => {
                        const newIngredients = [...ingredients];
                        newIngredients[id].ingredientAmount = event.value;
                        setIngredients(newIngredients);
                        setRecipe({
                          ...recipe,
                          recipeIngredients: newIngredients
                        });
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 8, md: 4, lg: 2 }}>
                  <SingleSelectForm
                    value={{
                      value: ingredients[id].ingredientUnit,
                      label: ingredients[id].ingredientUnit
                    }}
                    options={unitOptions}
                    onChange={(selectedOption: { value: string }) => {
                      const newIngredients = [...ingredients];
                      newIngredients[id].ingredientUnit = selectedOption.value;
                      setIngredients(newIngredients);
                      setIngredients(newIngredients);
                      setRecipe({
                        ...recipe,
                        recipeIngredients: newIngredients
                      });
                    }}
                  />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <Flex justifyContent="end">
                    <IconButton
                      size="md"
                      aria-label="remove ingredient"
                      icon={<MinusIcon />}
                      title="remove ingredient"
                      onClick={() => handleInputRemove(id)}
                    />
                  </Flex>
                </GridItem>
              </Grid>
            ))}
            <Grid
              h={{ base: "auto", md: "600px", sm: "1350px" }}
              templateRows={{ base: "repeat(9, 1fr)", md: "repeat18, 1fr)" }}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(10, 1fr)"
              }}
              mt={{ md: "3", lg: "0" }}
              gap={3}>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>INSTRUCTIONS</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <Center>
                  <FormControl isRequired>
                    <Textarea
                      size="lg"
                      id="instuctions"
                      name="recipeInstructions"
                      value={recipe.recipeInstructions}
                      placeholder="Instructions how to cook the dish"
                      _placeholder={{ position: "absolute", fontSize: "xs" }}
                      onChange={event => {
                        setRecipe({
                          ...recipe,
                          recipeInstructions: event.target.value
                        });
                      }}
                    />
                  </FormControl>
                </Center>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>COMPLEXITY</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <SingleSelectForm
                  options={complexityOptions}
                  value={{
                    value: recipe.recipeComplexityLevel,
                    label: recipe.recipeComplexityLevel
                  }}
                  onChange={(event: { value: string }) => {
                    setRecipe({
                      ...recipe,
                      recipeComplexityLevel: event.value
                    });
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>CATEGORIES</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <SingleSelectForm
                  options={categoriesOptions}
                  value={{
                    value: recipe.recipeCategory,
                    label: recipe.recipeCategory
                  }}
                  onChange={(event: { value: string }) => {
                    setRecipe({
                      ...recipe,
                      recipeCategory: event.value
                    });
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>TAGS</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <MultipleCreatableSelectForm
                  onChange={event => {
                    let tagsArray = event.map(item => item.value);
                    let recipeTagNames = tagsArray.map(tagValue => ({
                      tagName: tagValue
                    }));
                    setRecipe({
                      ...recipe,
                      recipeTags: recipeTagNames
                    });
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>SPECIAL DIETS</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <MultipleSelectForm
                  options={specialDietsOptions}
                  onChange={(
                    event: MultiValue<{ label: string; value: string }>
                  ) => {
                    let dietsArray = event.map(item => item.value);
                    setRecipe({
                      ...recipe,
                      recipeSpecialDiets: dietsArray
                    });
                  }}
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>COOKING TIME</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  value={
                    recipe.recipeCookTime.recipeCookTimeMinutes !== 0
                      ? recipe.recipeCookTime.recipeCookTimeMinutes
                      : ""
                  }
                  type="number"
                  placeholder="min"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipeCookTime: {
                        recipeCookTimeMinutes: Number(event.target.value)
                      },
                      recipeTotalTime: {
                        recipeTotalTimeMinutes:
                          Number(event.target.value) +
                          recipe.recipeCookTime.recipeCookTimeMinutes
                      }
                    });
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>PREP TIME</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  value={
                    recipe.recipePrepTime.recipePrepTimeMinutes !== 0
                      ? recipe.recipePrepTime.recipePrepTimeMinutes
                      : ""
                  }
                  type="number"
                  placeholder="min"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  min="0"
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipePrepTime: {
                        recipePrepTimeMinutes: Number(event.target.value)
                      },
                      recipeTotalTime: {
                        recipeTotalTimeMinutes:
                          Number(event.target.value) +
                          recipe.recipeCookTime.recipeCookTimeMinutes
                      }
                    });
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>CALORIES</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  type="number"
                  placeholder="kcal"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  value={
                    recipe.recipeNutritionInfo.NutritionInfoCalories !== 0
                      ? recipe.recipeNutritionInfo.NutritionInfoCalories
                      : ""
                  }
                  min="0"
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipeNutritionInfo: {
                        ...recipe.recipeNutritionInfo,
                        NutritionInfoCalories: Number(event.target.value)
                      }
                    });
                  }}
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>CARBS</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  type="number"
                  placeholder="g"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  value={
                    recipe.recipeNutritionInfo.NutritionInfoCarbs !== 0
                      ? recipe.recipeNutritionInfo.NutritionInfoCarbs
                      : ""
                  }
                  min="0"
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipeNutritionInfo: {
                        ...recipe.recipeNutritionInfo,
                        NutritionInfoCarbs: Number(event.target.value)
                      }
                    });
                  }}
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>PROTEIN</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  type="number"
                  placeholder="g"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  value={
                    recipe.recipeNutritionInfo.NutritionInfoProtein !== 0
                      ? recipe.recipeNutritionInfo.NutritionInfoProtein
                      : ""
                  }
                  min="0"
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipeNutritionInfo: {
                        ...recipe.recipeNutritionInfo,
                        NutritionInfoProtein: Number(event.target.value)
                      }
                    });
                  }}
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>FAT</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  type="number"
                  value={
                    recipe.recipeNutritionInfo.NutritionInfoFat !== 0
                      ? recipe.recipeNutritionInfo.NutritionInfoFat
                      : ""
                  }
                  placeholder="g"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  min="0"
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipeNutritionInfo: {
                        ...recipe.recipeNutritionInfo,
                        NutritionInfoFat: Number(event.target.value)
                      }
                    });
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 3 }}>
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text>SERVINGS</Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Input
                  value={
                    recipe.recipeServings !== 0 ? recipe.recipeServings : ""
                  }
                  type="number"
                  placeholder="person(s)"
                  _placeholder={{
                    position: "absolute",
                    marginTop: "-1",
                    fontSize: "xs"
                  }}
                  onChange={event => {
                    setRecipe({
                      ...recipe,
                      recipeServings: Number(event.target.value)
                    });
                  }}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 4 }} mt={{ base: "4", md: "0" }}>
            <DropImage
              srcImage={srcImage}
              onChange={event => {
                if (event.target.files === null) return;
                const file = event.target.files[0];
                const newSrc = URL.createObjectURL(file);
                setsrcImage(newSrc);
                setRecipe({
                  ...recipe,
                  recipeImage: event.target.files[0]
                });
              }}
            />
          </GridItem>
        </Grid>

        <Flex m="3rem 0" justifyContent="center">
          <Button type="submit" size="lg">
            SAVE
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default RecipeManual;
