import {
  Heading,
  Stack,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  VStack,
  Center
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <Grid>
      <GridItem
        w="100%"
        h={{ base: "calc(100vh - 167px)", md: "calc(100vh - 70px)" }}
        backgroundImage="url('/images/plate_404.jpeg')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        display="flex"
        flexDirection="column">
        <Center>
          <Stack>
            <VStack spacing={4}>
              <Flex
                flexGrow="1"
                alignItems="center"
                mt={{ base: "100px", md: "150" }}>
                <Heading as="h3" size="xl">
                  <Text
                    align="center"
                    fontSize={{ base: "25px", md: "30px" }}
                    ml="20"
                    mr="20"
                    color="blackAlpha.700">
                    Oops! Your desired recipe is off on a culinary adventure,
                    and our detectives are hot on the trail!
                  </Text>
                </Heading>
              </Flex>
            </VStack>
            <VStack spacing={4}>
              <Flex flexGrow="1" alignItems="center">
                <Heading size="3xl" mt={{ base: "50", md: "70" }}>
                  <Text
                    fontSize={{ base: "40px", md: "50px" }}
                    color="RGBA(0, 0, 0, 0.36)">
                    404
                  </Text>
                </Heading>
              </Flex>
            </VStack>
            <VStack spacing={4}>
              <Flex
                flexGrow="1"
                alignItems="center"
                justifyContent="space-between"
                flexBasis="5px">
                <Button
                  variant="link"
                  backdropFilter="blur(5px)"
                  size={{ base: "md", md: "lg" }}
                  mt={{ base: "100", md: "150" }}
                  onClick={navigateBack}>
                  <Text as="ins">Lead Me Back to Deliciousness</Text>
                </Button>
              </Flex>
            </VStack>
          </Stack>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default NotFound;
