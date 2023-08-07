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
      <GridItem colSpan={1} w="100%">
        <Box>
          <Image
            borderRadius="lg"
            boxSize="100%"
            src="/images/avocado_toast.png"
          />
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Center>
          <Flex direction="column" paddingRight="50" paddingLeft="50">
            <HStack
              width="100%"
              height="150px"
              display="flex"
              justifyContent="space-between"
              ml="1rem"
              marginBottom="50"
              alignItems="center">
              <Box p={2} display={{ md: "flex" }}>
                <Image
                  borderRadius="lg"
                  width={{ md: 60 }}
                  boxSize="40%"
                  src="/images/Logo_Olivier.svg"
                />
                <Box p={5} mt={{ base: 2, md: "flex" }} ml={"200px"}>
                  <Button variant="outline">
                    <Link as={RouterLink} to="/login">
                      SIGN IN
                    </Link>
                  </Button>
                </Box>
              </Box>
            </HStack>
            <HStack marginBottom="70" height="150px">
              <Heading as="h3" size="3xl">
                PLAN YOUR MEALS WITH OLIVIER!
              </Heading>{" "}
            </HStack>
            <HStack
              height="300"
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Box p={4} display={{ md: "flex" }}>
                <Box mt={{ base: 0, md: 0 }} ml="200px">
                  <Center>
                    <Button
                      variant="outline"
                      size="lg"
                      height="48px"
                      width="200px">
                      <Link as={RouterLink} to="/register">
                        Create an account
                      </Link>
                    </Button>
                  </Center>
                </Box>
              </Box>
            </HStack>
            {/* <HStack
            width="95%"
            display="flex"
            justifyContent="space-between"
            ml="1rem"
            alignItems="center">
            <Box p={4} display={{ md: "flex" }}>
              <Box mt={{ base: 0, md: 0 }} ml={params.iconSpacing}>
                <Link href="https://www.facebook.com/" isExternal>
                  <FaFacebookF size={params.iconSize} />
                </Link>
              </Box>
              <Box mt={{ base: 0, md: 0 }} ml={params.iconSpacing}>
                <Link href="https://twitter.com/" isExternal>
                  <FaTwitter size={params.iconSize} />
                </Link>
              </Box>
              <Box mt={{ base: 0, md: 0 }} ml={params.iconSpacing}>
                <Link href="https://www.instagram.com/" isExternal>
                  <BsInstagram size={params.iconSize} />
                </Link>
              </Box>
            </Box>
          </HStack> */}
          </Flex>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default Home;
