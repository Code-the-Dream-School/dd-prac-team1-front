import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Link,
  Grid,
  GridItem,
  Center,
  Text,
  Card,
  CardBody,
  Flex
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
const params = {
  iconSize: "30",
  iconSpacing: "10px"
};

const Home = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem
        colSpan={1}
        w="100%"
        h="100vh"
        backgroundImage="url('/images/avocado_toast.png')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <GridItem
        colSpan={1}
        w="100%"
        h="100vh"
        padding="50"
        display="flex"
        flexDirection="column">
        <Flex justifyContent="space-between" flexBasis="50px">
          <Image borderRadius="lg" src="/images/Logo_Olivier.svg" />
          <Button variant="outline">
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
            <Button variant="outline" size="lg">
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
