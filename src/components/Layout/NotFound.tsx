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
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <Grid>
      <GridItem
        w="100%"
        h="100vh"
        backgroundImage="url('/images/plate_404.jpeg')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        padding="78"
        display="flex"
        flexDirection="column">
        <Center>
          <Stack>
            <VStack spacing={4}>
              <Flex flexGrow="1" alignItems="center">
                <Heading as="h3" size="xL">
                  <Text align="center" fontSize="30px" color="blackAlpha.700">
                    Oops! Your desired recipe is off on a culinary adventure,
                    and our detectives are hot on the trail!
                  </Text>
                </Heading>
              </Flex>
            </VStack>
            <VStack spacing={4}>
              <Flex flexGrow="1" alignItems="center">
                <Heading size="3xl">
                  <Text fontSize="50px" color="RGBA(0, 0, 0, 0.36)">
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
                <Button variant="link" size="lg" onClick={navigateToHome}>
                  <Text as="ins" color="blackAlpha.700">
                    Lead Me Back to Deliciousness
                  </Text>
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
