import {
  Button,
  Heading,
  Image,
  Link,
  Grid,
  GridItem,
  Center,
  Flex,
  Box,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  "/images/demo/1.png",
  "/images/demo/2.png",
  "/images/demo/3.png"
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <GridItem
        colSpan={1}
        w="100%"
        h="90vh"
        padding="30"
        position="relative"
        borderRadius="20px"
        overflow="hidden" // Hide any content that exceeds the rounded corners
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          position="relative"
          top="0"
          left="0"
          width="100%"
          height="100%">
          <Image
            src="/images/avocado_toast.png"
            alt="Background Image"
            objectFit="cover"
            width="100%"
            height="100%"
            position="absolute"
            top="0"
            left="0"
            borderRadius="20px"
          />
        </Flex>
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        h="70vh"
        padding="50"
        display="flex"
        flexDirection="column">
        <Flex justifyContent="space-between" flexBasis="50px">
          <Image borderRadius="lg" src="/images/Logo_Olivier.svg" />
          <Button variant="outline" background={"green"}>
            <Link as={RouterLink} to="/login">
              SIGN IN
            </Link>
          </Button>
        </Flex>
        <Flex flexGrow="1" alignItems="center">
          <Heading as="h3" size="3xl">
            PLAN YOUR MEALS WITH OLIVIER!
          </Heading>
        </Flex>
        <Center>
          <Flex h="30%">
            <Button variant="outline" size="lg" background={"green"}>
              <Link as={RouterLink} to="/register">
                Create an account
              </Link>
            </Button>
          </Flex>
        </Center>
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        h="90vh"
        padding="30"
        position="relative"
        borderRadius="20px">
        <Flex
          justifyContent="center"
          alignItems="center"
          position="relative"
          top="0"
          left="0"
          width="100%"
          height="100%">
          <Box width="100%" maxWidth="100%" maxHeight="100%">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                opacity={index === currentSlide ? 1 : 0}
                transition="opacity 1s ease-in-out"
                position="absolute"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                top="10"
                left="inherit"
                objectFit="cover"
                backgroundPosition="center"
                borderRadius="20px"
                border={"1px solid #d7da5e"}
              />
            ))}
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={1} w="100%" h="90vh">
        <Flex flexDirection="column" position="relative">
          <Box p={5}>
            <Text fontSize="xl">Discover new recipes</Text>
            <Text>
              Olivier will find new delicious recipes for every taste. Say
              goodbye to boring meals and hello to culinary inspiration. You can
              easily add your own recipe, edit, adjust and store recipes.
              Quickly search and select what you want to cook.
            </Text>
          </Box>
          <Box p={5}>
            <Text fontSize="xl">Stay healthy and balanced</Text>
            <Text>
              Take control of your nutrition with Olivier's meal planner. Ensure
              you're getting a well-balanced diet by customizing your meals
              based on your dietary preferences and goals.
            </Text>
          </Box>
          <Box p={5}>
            <Text fontSize="xl">Save time and money</Text>
            <Text>
              With Olivier, you can plan your meals in advance, make your life
              easier and no longer stress about what to cook for dinner. Save
              time and money with efficient meal planning.
            </Text>
          </Box>
          <Box p={5}>
            <Text fontSize="xl">Generate shopping lists</Text>
            <Text>
              Create grocery lists based on the recipes you choose. Say goodbye
              to aimless wandering and hello to efficient shopping!
            </Text>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Home;
