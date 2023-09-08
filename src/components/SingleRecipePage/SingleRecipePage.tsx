import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Icon,
  IconButton,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  UnorderedList,
  useToast
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { SavedRecipe, RecipeTag } from "../../utils/types";
import { getSingleRecipe, deleteSingleRecipe } from "../../utils/fetchData";
import {
  ArrowBackIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon
} from "@chakra-ui/icons";
import { GiPencil, GiCalendar, GiShoppingCart } from "react-icons/gi";
import { IoTrashOutline } from "react-icons/io5";
import { TfiPrinter } from "react-icons/tfi";
import SingleRecipeTag from "./SingleRecipeTag";
import SingleRecipeIngredient from "./SingleRecipeIngredient";
import ModalForServings from "./ModalForServings";
import { saveRecipeIngredientsToShoppingList } from "../../utils/fetchData";

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState<SavedRecipe | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [servingSize, setServingSize] = useState(0);
  const { isOpen: openNutrition, onToggle } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen: openModal, onOpen, onClose } = useDisclosure();
  const { slug } = useParams();
  const recipeId = slug;
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (recipeId === undefined) return;
    getSingleRecipe(recipeId)
      .then(response => {
        setRecipe(response.data);
        setServingSize(response.data.recipeServings);
      })
      .catch(error => {
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

  const print = () => {
    window.print();
  };

  const deleteRecipe = () => {
    if (recipeId === undefined) return;
    deleteSingleRecipe(recipeId)
      .then(response => {
        navigate("/saved-recipes");
      })
      .catch(error => {
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

  const tagsAndDiets = () => {
    const renderingTags: string[] = [];
    recipe.recipeTags.map((tag: RecipeTag) =>
      renderingTags.push(tag.tagName.toLocaleLowerCase())
    );
    recipe.recipeSpecialDiets.forEach((diet: string) => {
      if (diet !== "None") {
        renderingTags.push(diet.toLocaleLowerCase());
      }
    });
    const removeDuplicates = (renderingTags: string[]) => {
      return renderingTags.filter(
        (tag: any, index: any) => renderingTags.indexOf(tag) === index
      );
    };
    return removeDuplicates(renderingTags);
  };
  const sendIngredients = (servings: number) => {
    if (recipeId === undefined) return;
    saveRecipeIngredientsToShoppingList(recipeId, servings)
      .then(response => {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="3" bg="green" borderRadius="5">
                <Flex flexDirection="column">
                  Your recipe has been added to the shopping list
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/shopping-list");
                      toast.closeAll();
                    }}>
                    Take me to the Shopping List
                  </Button>
                </Flex>
              </Box>
            </>
          )
        });
      })
      .catch(error => {
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

  const nutrition = [
    {
      displayName: "Calories",
      content: recipe.recipeNutritionInfo.NutritionInfoCalories,
      unit: "kcal"
    },
    {
      displayName: "Carbohydrates",
      content: recipe.recipeNutritionInfo.NutritionInfoCarbs,
      unit: "g"
    },
    {
      displayName: "Protein",
      content: recipe.recipeNutritionInfo.NutritionInfoProtein,
      unit: "g"
    },
    {
      displayName: "Fat",
      content: recipe.recipeNutritionInfo.NutritionInfoFat,
      unit: "g"
    }
  ];
  return (
    <Container maxW="5xl" mb="5">
      <Grid
        templateColumns={{
          base: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)"
        }}
        gap="2">
        <GridItem colSpan={{ base: 3, md: 2 }} w="100">
          <Flex
            mt={{ base: "5", md: "10" }}
            mb={{ base: "0", md: "5" }}
            alignItems="center"
            gap="4">
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="on the previous page"
              icon={<ArrowBackIcon />}
              title="on the previous page"
              onClick={() => {
                navigate("/saved-recipes");
              }}
            />
            <Heading size="lg">{recipe.recipeName.toUpperCase()}</Heading>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={{ base: 4, md: 1 }}
          w="100%"
          display="flex"
          alignItems="end"
          justifyContent="center">
          <Flex
            w={{
              base: "80%",
              md: "68%",
              lg: "100%"
            }}
            gap="2"
            flexShrink="1"
            flexWrap="wrap"
            mt="5"
            mb="5"
            justifyContent="center">
            {showConfirm ? (
              <>
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Confirm delete"
                  icon={<CheckIcon />}
                  title="confirm delete"
                  onClick={deleteRecipe}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Cancel delete"
                  icon={<CloseIcon />}
                  title="cancel delete"
                  onClick={() => {
                    setShowConfirm(false);
                  }}
                />
              </>
            ) : (
              <>
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Edit recipe"
                  icon={<GiPencil />}
                  title="edit"
                  onClick={() => {
                    navigate(`/edit/${slug}`);
                  }}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Go to the menu planner"
                  icon={<GiCalendar />}
                  title="go to the menu planner"
                  onClick={() => {
                    navigate("/planner");
                  }}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Add to the shopping list"
                  icon={<GiShoppingCart />}
                  title="add to the shopping cart"
                  onClick={onOpen}
                />
                <ModalForServings
                  isOpen={openModal}
                  onClose={() => {
                    onClose();
                  }}
                  value={servingSize}
                  sendIngredients={sendIngredients}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Delete recipe"
                  icon={<IoTrashOutline />}
                  title="delete"
                  onClick={() => {
                    setShowConfirm(true);
                  }}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Print recipe"
                  icon={<TfiPrinter />}
                  title="print"
                  onClick={print}
                />
              </>
            )}
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 2 }} w="95%">
          <Flex direction={{ base: "column", md: "row" }}>
            {recipe.recipePrepTime.recipePrepTimeMinutes > 0 && (
              <Text>
                <b>Prep time:</b>&nbsp;
                {`${recipe.recipePrepTime.recipePrepTimeMinutes} min`}
                &nbsp;&nbsp;
              </Text>
            )}
            {recipe.recipeCookTime.recipeCookTimeMinutes > 0 && (
              <Text>
                <b>Cooking time:</b>&nbsp;
                {`${recipe.recipeCookTime.recipeCookTimeMinutes} min`}
                &nbsp;&nbsp;
              </Text>
            )}
            {recipe.recipeTotalTime.recipeTotalTimeMinutes > 0 && (
              <Text>
                <b>Total:</b>&nbsp;
                {`${recipe.recipeTotalTime.recipeTotalTimeMinutes} min`}
                &nbsp;&nbsp;
              </Text>
            )}
          </Flex>
          <Text>
            <b>Complexity level:</b>&nbsp;
            {`${recipe.recipeComplexityLevel}`}
            &nbsp;&nbsp;
          </Text>
          {recipe.recipeServings > 0 && (
            <Text>
              <b>Servings:</b>&nbsp;
              {`${recipe.recipeServings}`}
              &nbsp;&nbsp;
            </Text>
          )}
          <Flex flexDirection="column">
            <Box mt="5">
              <Heading as="h3" size="md" mb="3">
                Ingredients
              </Heading>
              <UnorderedList>
                {recipe.recipeIngredients.map((ingredient, _id) => (
                  <SingleRecipeIngredient key={_id} ingredient={ingredient} />
                ))}
              </UnorderedList>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }} w="100%">
          <Box
            h="300px"
            backgroundImage={recipe.recipeImage}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            borderRadius="5"
          />
          <Flex mt="2" flexWrap="wrap" justifyContent="center">
            {tagsAndDiets().map((tag, index) => (
              <SingleRecipeTag key={index} tag={tag} />
            ))}
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <Box mt="5">
            <Heading as="h3" size="md" mb="3">
              Instructions
            </Heading>
            <Text>{recipe.recipeInstructions}</Text>
          </Box>
          {(recipe.recipeNutritionInfo.NutritionInfoCalories !== 0 ||
            recipe.recipeNutritionInfo.NutritionInfoCarbs !== 0 ||
            recipe.recipeNutritionInfo.NutritionInfoFat !== 0 ||
            recipe.recipeNutritionInfo.NutritionInfoProtein !== 0) && (
            <Box mt="5">
              <Flex onClick={onToggle} cursor="pointer">
                <Heading as="h3" size="md" mb="3">
                  Nutrition Information
                </Heading>
                <Box as="span">
                  <Icon as={ChevronDownIcon} />
                </Box>
              </Flex>
              <Collapse in={openNutrition} animateOpacity>
                <Flex
                  direction={{
                    base: "column",
                    md: "row"
                  }}>
                  {nutrition.map(({ displayName, content, unit }, index) => (
                    <Box key={index}>
                      {content > 0 && (
                        <Text as="span">
                          <b>{displayName}:</b> {content}
                          {unit}&nbsp;
                        </Text>
                      )}
                    </Box>
                  ))}
                </Flex>
              </Collapse>
            </Box>
          )}
        </GridItem>
        <GridItem colSpan={{ base: 0, md: 1 }} />
      </Grid>
    </Container>
  );
};
export default SingleRecipePage;
