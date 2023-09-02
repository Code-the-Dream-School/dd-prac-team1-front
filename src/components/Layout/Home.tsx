import {
  Button,
  Heading,
  Image,
  Link,
  Grid,
  GridItem,
  Center,
  Flex
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        w="100%"
        h={{ base: "30vh", md: "90vh" }}
        backgroundImage="url('/images/avocado_toast.png')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        w="100%"
        h={{ base: "40vh", md: "100%" }}
        padding={{ base: "25px", md: "50" }}
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
            size={{ base: "sm", sm: "md", md: "lg" }}>
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
    </Grid>
  );
};

export default Home;
