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
  "/images/demo/gif_1.gif",
  "/images/demo/gif_2.gif",
  "/images/demo/gif_5.gif"
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={2} p="5">
        <GridItem
          colSpan={{ base: 2, md: 1 }}
          w="100%"
          h={{ base: "40vh", md: "90vh" }}
          backgroundImage="url('/images/avocado_toast.png')"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          borderRadius="lg"
        />
        <GridItem
          colSpan={{ base: 2, md: 1 }}
          w="100%"
          h={{ base: "40vh", md: "100%" }}
          p={{ base: "25px", md: "45" }}
          display="flex"
          flexDirection="column">
          <Flex
            justifyContent="space-between"
            flexBasis="50px"
            alignItems="center">
            <Image
              borderRadius="lg"
              src="/images/Logo_Olivier.svg"
              alt="logo image"
              h={{ base: "35px", sm: "40px", md: "45px", lg: "55px" }}
            />
            <Button
              variant="outline"
              background={"green"}
              size={{ base: "sm", sm: "md", md: "lg" }}
              noOfLines={1}>
              <Link as={RouterLink} to="/login">
                SIGN IN
              </Link>
            </Button>
          </Flex>
          <Flex flexGrow="1" alignItems="center" justifyContent="center">
            <Heading as="h3" size={{ base: "lg", md: "3xl" }}>
              PLAN YOUR MEALS WITH OLIVIER!
            </Heading>
          </Flex>
          <Center>
            <Flex>
              <Button
                variant="outline"
                size={{ base: "sm", sm: "md", md: "lg" }}
                background={"green"}>
                <Link as={RouterLink} to="/register">
                  Create an account
                </Link>
              </Button>
            </Flex>
          </Center>
        </GridItem>
        <GridItem
          colSpan={{ base: 2, md: 1 }}
          w="100%"
          h={{ base: "30vh", sm: "50vh", md: "90vh" }}
          position="relative"
          mt="10"
          borderRadius="20px">
          <Flex
            justifyContent="center"
            alignItems="center"
            width="95%"
            height="100%">
            <Box width="100%">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  h={{ base: "100%", md: "50%" }}
                  opacity={index === currentSlide ? 1 : 0}
                  transition="opacity 1s ease-in-out"
                  position="absolute"
                  top="5"
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
        <GridItem
          colSpan={{ base: 2, md: 1 }}
          w="100%"
          mt={{ base: "50", md: "30" }}>
          <Flex flexDirection="column">
            <Box p="5">
              <Text fontSize="xl">Discover new recipes</Text>
              <Text>
                Olivier will find new delicious recipes for every taste. Say
                goodbye to boring meals and hello to culinary inspiration. You
                can easily add your own recipe, edit, adjust and store recipes.
                Quickly search and select what you want to cook.
              </Text>
            </Box>
            <Box p={5}>
              <Text fontSize="xl">Stay healthy and balanced</Text>
              <Text>
                Take control of your nutrition with Olivier's meal planner.
                Ensure you're getting a well-balanced diet by customizing your
                meals based on your dietary preferences and goals.
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
                Create grocery lists based on the recipes you choose. Say
                goodbye to aimless wandering and hello to efficient shopping!
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
