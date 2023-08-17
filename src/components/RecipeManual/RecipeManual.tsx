import { Box, Center, Container, Flex, Heading } from "@chakra-ui/layout";
import { FormControl, Grid, GridItem, IconButton, Input, Textarea, Text, Button } from "@chakra-ui/react";
//import { useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import DropImage from "./DropImage";
import MultipleCreatableSelectForm from "./SelectForms/MultipleCreatableSelectForm";
import SingleSelectForm from "./SelectForms/SingleSelectForm";
import MultipleSelectForm from "./SelectForms/MultipleSelectForm";
import { categoriesOptions } from "./SelectForms/OptionsData";
import { complexityOptions } from "./SelectForms/OptionsData";
import { specialDietsOptions } from "./SelectForms/OptionsData";
import { tagsOptions } from "./SelectForms/OptionsData";

const RecipeManual = () => {
    /*const [title, setTitle] = useState<Array<string> | null>(null);
    const [ingredients, setIngredients] = useState<Array<string> | null>(null);
    const [instructions, setInstructions] = useState<Array<string> | null>(null);
    const [diets, setDiets] = useState<Array<string> | null>(null);
    const [values, setValues] = useState<Array<string>>([]);*/

    return(
        <Box      
            as="form"
            /* onSubmit={event => {
                event.preventDefault();
                saveRecipe()
                }}*/
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
                            id="title"
                            variant="flushed"
                            //value={title}
                            placeholder="TITLE"
                            borderColor="#D7DA5E"
                            focusBorderColor='#F4F4EB'
                            //onChange={event => {
                            //    setTitle(event.target.value);
                           // }}
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
                    <IconButton
                        ml="10px"
                        size="sm"
                        variant="outline"
                        aria-label="add ingredient"
                        icon={<AddIcon />}
                        title="add ingredient"
                        borderColor="#D7DA5E"
                        colorScheme='green'
                    />
                </Flex>
            </GridItem>
            <GridItem colSpan={6}>
                <Grid
                h="700px" 
                templateRows='repeat(8, 1fr)'
                templateColumns='repeat(10, 1fr)'
                gap={3}
                >
                <GridItem colSpan={5}>
                    <FormControl isRequired>
                    <Input
                        type="text"
                        id="title"
                        variant="outline"
                       // value={ingredients}
                        placeholder="Add ingredients"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        borderColor="#D7DA5E"
                        focusBorderColor='#F4F4EB'
                       // onChange={event => {
                       //     setIngredients(event.target.value);
                       // }}
                    />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Input
                        type="number"
                        id=""
                        variant="outline"
                        placeholder="quantity"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        borderColor="#D7DA5E"
                        focusBorderColor='#F4F4EB'
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <Input
                        type="text"
                        id=""
                        variant="outline"
                        placeholder="unit"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                        borderColor="#D7DA5E"
                        focusBorderColor='#F4F4EB'
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <Flex justifyContent="end" > 
                    <IconButton
                        size="md"
                        borderColor="#D7DA5E"
                        colorScheme='green'
                        variant="outline"
                        aria-label="remove ingredient"
                        icon={<MinusIcon />}
                        title="remove ingredient"
                    />
                    </Flex>
                </GridItem>
                <GridItem colSpan={10} > 
                    <Center>
                        <FormControl isRequired>
                        <Textarea
                            size="lg"
                            id="instuctions"
                            variant="outline"
                           // value={instructions}
                            placeholder="Instructions"
                            _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                           // onChange={event => {
                           //     setInstructions(event.target.value);
                           // }}
                        />
                        </FormControl>
                    </Center>
                </GridItem>
                <GridItem  colSpan={2}>
                    <Flex h="40px" justifyContent="start"  alignItems="center">
                        <Text>COMPLEXITY</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={8} > 
                    <SingleSelectForm placeholder={"Choose a complexity level"} options={complexityOptions} />
                </GridItem>
                <GridItem  colSpan={2}>
                    <Flex h="40px" justifyContent="start"  alignItems="center">
                        <Text>CATEGORIES</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={8} > 
                    <SingleSelectForm placeholder={"Choose a category"}  options={categoriesOptions} />
                </GridItem>
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>TAGS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={8}> 
                    <MultipleCreatableSelectForm options={tagsOptions}/>
                </GridItem>
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>SPECIAL DIETS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={8}> 
                    <MultipleSelectForm options={specialDietsOptions}/>
                </GridItem>

                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>COOKING TIME</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={3}> 
                    <Input
                        type="number"
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="min"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>PREP TIME</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={3}> 
                    <Input
                        type="number"
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="min"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}

                    />
                </GridItem>
                <GridItem colSpan={2}>
                <Flex h="40px" justifyContent="start"  alignItems="center">
                    <Text>SERVINGS</Text>
                </Flex>
                </GridItem>
                <GridItem colSpan={3}> 
                    <Input
                        type="number"
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="person(s)"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                    />
                </GridItem>
                </Grid>

                <Grid
                h="100%" 
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
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="kcal"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="g"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="g"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
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
                        id=""
                        variant="outline"
                      //  value={}
                        placeholder="g"
                        _placeholder={{ position:"absolute", marginTop: "-1", fontSize: "xs" }}
                    />
                </GridItem>

                </Grid>

            </GridItem>
            <GridItem colSpan={4}>
                <DropImage/>
            </GridItem>
            </Grid>

            <Flex mt="3rem" justifyContent="center">
                <Button
                    size='lg'
                    variant='outline'
                >SAVE
                </Button>
            </Flex>

            </Container>
        </Box>
    )
};

export default RecipeManual;