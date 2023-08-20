import { Box, Center, Container, Flex, Heading } from "@chakra-ui/layout";
import { FormControl, Grid, GridItem, IconButton, Input, Textarea, Text, Button, 
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { MinusIcon } from "@chakra-ui/icons";
import DropImage from "./DropImage";
import MultipleCreatableSelectForm from "./SelectForms/MultipleCreatableSelectForm";
import SingleSelectForm from "./SelectForms/SingleSelectForm";
import MultipleSelectForm from "./SelectForms/MultipleSelectForm";
import { categoriesOptions } from "../../utils/OptionsData";
import { complexityOptions } from "../../utils/OptionsData";
import { specialDietsOptions } from "../../utils/OptionsData";
import { unitOptions } from "../../utils/OptionsData";
import { SavedIngredient, ManualRecipe } from "../../utils/types";
import { saveManualRecipe } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { MultiValue } from "chakra-react-select";


const RecipeManual = () => {
    const [recipe, setRecipe] = useState<ManualRecipe>({
        recipeCategory: "Main Dish",
        recipeComplexityLevel: "medium",
        recipeCookTime: { recipeCookTimeMinutes: 0 },
        recipeImage: "", 
        recipeIngredients: [
            {
                ingredientName: "",
                ingredientAmount: 0,
                ingredientUnit: "other",
            },
            {
                ingredientName: "",
                ingredientAmount: 0,
                ingredientUnit: "other",
            },
        ],
        recipeInstructions: "",
        recipeName: "",
        recipeNutritionInfo: {
            NutritionInfoCalories: 0,
            NutritionInfoCarbs: 0,
            NutritionInfoProtein: 0,
            NutritionInfoFat: 0,
        },
        recipePrepTime: { 
            recipePrepTimeMinutes: 0 
        },
        recipeServings: 0,
        recipeSpecialDiets: [],
        recipeTags: [],
    });
    const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([
        {
            ingredientName: "",
            ingredientAmount: 0,
            ingredientUnit: "other",
        },
    ]);
    const [srcImage, setsrcImage] = useState<string>("");
    const navigate = useNavigate();
    const toast = useToast();

    const saveRecipe = () => {
        console.log(recipe)
        saveManualRecipe(recipe)
            .then(response => {
                console.log(response);
                navigate("/saved-recipes");
            })
            .catch(error => {
                console.log(error);
                toast({
                title: "Error",
                description: `${error.response.data.message}`,
                status: "warning",
                variant: "subtle",
                duration: 4000,
                isClosable: true,
                position: "top"
                });
            })
        };
        
        const handleInputAdd = () => {
                setIngredients([
                    ...ingredients,
                    {
                    ingredientName: "",
                    ingredientAmount: 0,
                    ingredientUnit: "other",
                    }
                ]);
            };

        const handleInputRemove = (index: number) => {
            const values = [...ingredients];
            values.splice(index, 1);
            setIngredients(values);
            setRecipe({ ...recipe, recipeIngredients: values });
        };

    return(
        <Box      
            as="form"
            onSubmit={(event: { preventDefault: () => void; }) => {
                event.preventDefault();
                saveRecipe()
                }}
            >
            <Container mt='20' maxW="2xl">
            <Grid
            h='200px'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(10, 1fr)'
            gap={4}
            >
                <GridItem colSpan={10}> 
                <Center>
                    <Heading as='h1' size='lg' noOfLines={1}>
                        ADD YOUR OWN RECIPE
                    </Heading>
                </Center>
                </GridItem>
                <GridItem colSpan={10} > 
                    <Center>
                        <FormControl isRequired>
                        <Input
                            type="text"
                            variant="flushed"
                            value={recipe.recipeName}
                            placeholder="TITLE"
                            onChange={event => {
                                setRecipe({
                                ...recipe,
                                recipeName: event.target.value
                                });
                            }}
                        />
                        </FormControl>
                    </Center>
                </GridItem>
            </Grid>
            </Container>
            <Container maxW="7xl">
            <Grid
                h='100%'
                templateColumns='repeat(10, 1fr)'
                gap={4}
                >
            <GridItem colSpan={10}>
                <Flex justifyContent="start" alignItems="center">
                    <Text>INGREDIENTS</Text>
                    <Button
                        ml="10px"
                        size="sm"
                        aria-label="add ingredient"
                        title="add ingredient"
                        onClick={handleInputAdd}
                    >
                        ADD
                    </Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={6}>
            
            {ingredients.map((ingredient, id) => (
                <Grid
                    h="70px" 
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(10, 1fr)'
                    gap={3}
                    key={id}
                >
                    <GridItem colSpan={5}>
                    <FormControl isRequired>
                    <Input
                        type="text"
                        id={`ingredientName-${id}`}
                        name={`ingredientName-${id}`}
                        value={ingredient.ingredientName}
                        placeholder="Add ingredients"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                    <Input
                        type="number"
                        id="ingredientAmount"
                        name="ingredientAmount"
                        value={ingredient.ingredientAmount === 0 ? "" : ingredient.ingredientAmount}
                        placeholder="quantity"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        onChange={event => {
                            const newIngredients = [...ingredients];
                            newIngredients[id].ingredientAmount = Number(event.target.value);
                            setIngredients(newIngredients);
                            setRecipe({
                                ...recipe,
                                recipeIngredients: newIngredients,
                                });
                            }}
                    />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <SingleSelectForm 
                        value={ { value: ingredients[id].ingredientUnit, label: ingredients[id].ingredientUnit } }
                        placeholder="unit"
                        options={unitOptions} 
                        onChange={(selectedOption: { value: string; } ) => {
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
                <GridItem colSpan={1}>
                    <Flex justifyContent="end" > 
                    <IconButton
                        size="md"
                        aria-label="remove ingredient"
                        icon={<MinusIcon />}
                        title="remove ingredient"
                        onClick={ ()=> handleInputRemove(id) }
                    />
                    </Flex>
                </GridItem>
                </Grid>
                ))}
                <Grid
                h="600px" 
                templateRows='repeat(8, 1fr)'
                templateColumns='repeat(10, 1fr)'
                gap={3}
                > 
                <GridItem colSpan={2}>
                    <Flex  h="40px" justifyContent="start"  alignItems="center">
                        <Text>INSTRUCTIONS</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={8} mb="30px"> 
                    <Center>
                        <FormControl isRequired>
                        <Textarea
                            size="lg"
                            id="instuctions"
                            name="recipeInstructions"
                            value={recipe.recipeInstructions}
                            placeholder="Instructions how to cook the dish"
                            _placeholder={{ position:"absolute", marginTop: "-0.5", fontSize: "xs" }}
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
                <GridItem colSpan={2}>
                    <Flex  h="40px" justifyContent="start"  alignItems="center">
                        <Text>COMPLEXITY</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={8} > 
                    <SingleSelectForm 
                        placeholder={"Choose a complexity level"} 
                        options={complexityOptions} 
                        value={{ value: recipe.recipeComplexityLevel, label: recipe.recipeComplexityLevel }} 
                        onChange={(event: { value: string; }) => {
                            setRecipe({
                                ...recipe,
                                recipeComplexityLevel: event.value,
                            });
                        }}
                    />
                </GridItem>
                <GridItem  colSpan={2}>
                    <Flex h="40px" justifyContent="start"  alignItems="center">
                        <Text>CATEGORIES</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={8} > 
                    <SingleSelectForm 
                        placeholder={"Choose a category"} 
                        options={categoriesOptions} 
                        value={{ value: recipe.recipeCategory, label: recipe.recipeCategory }} 
                        onChange={(event: { value: string; }) => {
                            setRecipe({
                                ...recipe,
                                recipeCategory: event.value,
                            });
                        }}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>TAGS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={8}> 
                    <MultipleCreatableSelectForm 
                        onChange={(
                            event
                        )=> {
                            let tagsArray = event.map(item => item.value);
                            let recipeTagNames = tagsArray.map( tagValue => ({ tagName: tagValue }) );
                            setRecipe({
                                ...recipe,
                                recipeTags: recipeTagNames
                            })
                        }
                    } 
                        />
                </GridItem>
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>SPECIAL DIETS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={8}> 
                    <MultipleSelectForm  
                        options={specialDietsOptions}
                        onChange={(
                            event: MultiValue<{ label: string; value: string }>
                        ) => {
                            let dietsArray = event.map(item => item.value);
                            setRecipe({
                                ...recipe,
                                recipeSpecialDiets: dietsArray,
                            })
                        }} 
                    />
                </GridItem>

                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>COOKING TIME</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={3}> 
                    <Input
                        value={recipe.recipeCookTime.recipeCookTimeMinutes !== 0 ? recipe.recipeCookTime.recipeCookTimeMinutes : ""}
                        type="number"
                        placeholder="min"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>PREP TIME</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={3}> 
                    <Input
                        value={recipe.recipePrepTime.recipePrepTimeMinutes !== 0 ? recipe.recipePrepTime.recipePrepTimeMinutes : ""}
                        type="number"
                        placeholder="min"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>SERVINGS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={3}> 
                    <Input
                        value={recipe.recipeServings !== 0 ? recipe.recipeServings : ''}
                        type="number"
                        placeholder="person(s)"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        onChange={event => {
                            setRecipe({
                                ...recipe,
                                recipeServings: Number(event.target.value),
                            });
                        }}
                    />
                </GridItem>
                </Grid> 

                <Grid
                templateColumns='repeat(12, 1fr)'
                gap={3}
                > 
                <GridItem colSpan={1}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>CALORIES</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={2}> 
                    <Input
                        type="number"
                        placeholder="kcal"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        value={recipe.recipeNutritionInfo.NutritionInfoCalories !== 0 ? recipe.recipeNutritionInfo.NutritionInfoCalories : ''}
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

                <GridItem colSpan={1}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>CARBS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={2}> 
                    <Input
                        type="number"
                        placeholder="g"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        value={recipe.recipeNutritionInfo.NutritionInfoCarbs !== 0 ? recipe.recipeNutritionInfo.NutritionInfoCarbs : ""}
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

                <GridItem colSpan={1}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>PROREIN</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={2}> 
                    <Input
                        type="number"
                        placeholder="g"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        value={recipe.recipeNutritionInfo.NutritionInfoProtein !== 0 ? recipe.recipeNutritionInfo.NutritionInfoProtein : ""}
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

                <GridItem colSpan={1}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>FAT</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={2}> 
                    <Input
                        type="number"
                        value={recipe.recipeNutritionInfo.NutritionInfoFat !== 0 ? recipe.recipeNutritionInfo.NutritionInfoFat : ""}
                        placeholder="g"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                </Grid>
            </GridItem>
            <GridItem colSpan={4}>
                <DropImage srcImage={srcImage} onChange={event => {
                    if (event.target.files === null) return;
                    const file = event.target.files[0];
                    const newSrc = URL.createObjectURL(file);
                    setsrcImage(newSrc);
                    setRecipe({
                        ...recipe,
                        recipeImage: event.target.files[0]
                    });
                }
                }/>
            </GridItem>
            </Grid>

            <Flex mt="3rem" justifyContent="center">
                <Button type="submit"
                    size='lg'
                >SAVE
                </Button>
            </Flex>

            </Container>
        </Box>
    )
};

export default RecipeManual;

