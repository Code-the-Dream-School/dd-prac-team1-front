import { Box, Flex, Text, IconButton, Container, useBreakpointValue } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const iconSize = useBreakpointValue({ base: "1rem", md: "1.5rem" });

  return (
    <Box
      as="footer"
      py={4}
      height="70"
      width="100%"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      marginTop="auto"
      bg="brandGray"
      color="black">
      <Container maxW="7xl">
        <Flex justify="space-between" align={{ base: "center", md: "flex-start" }}>
          <Text pl={{ base: 4, md: 0 }} mb={{ base: 2, md: 0 }}>
            &copy; 2023 Olivier Meal Planner
          </Text>
          
            <Box as="a" href="/team" mx={10}>
              <Text
                _hover={{
                  borderBottomColor: "green",
                  borderBottomWidth: "2px",
                  borderBottomStyle: "solid"
                }}>
                MEET THE TEAM
              </Text>
            </Box>

            <Box as="a" href="/Contact" mr={10}>
              <Text
                _hover={{
                  borderBottomColor: "green",
                  borderBottomWidth: "2px",
                  borderBottomStyle: "solid"
                }}>
                CONTACT
              </Text>
            </Box>
            </Flex>    
            <Flex justify="center" alignItems={{ base: "center", md: "flex-start" }} mt={{ base: 2, md: 0 }}>        
            <IconButton
              as="a"
              href="https://github.com/Code-the-Dream-School/dd-prac-team1-front"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              fontSize="1.5rem"
              mx={2}
              bg="#f4f4eb"
              color="black"
              _hover={{
                border: "1px"
              }}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/olivier_meal_planner/"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              fontSize="1.5rem"
              mx={2}
              bg="#f4f4eb"
              color="black"
              _hover={{
                border: "1px"
              }}
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/profile.php?id=61550038485390"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook />}
              fontSize="1.5rem"
              mx={2}
              bg="#f4f4eb"
              color="black"
              _hover={{
                border: "1px"
              }}
            />
          </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
