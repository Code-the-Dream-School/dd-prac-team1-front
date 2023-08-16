import { Box, Flex, Text, IconButton, Container } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      bg="brandGray"
      color="black"
      height="82"
      width="100%">
      <Container maxW="6xl">
        <Flex justify="space-between" align="center">
          <Text pl={4}>&copy; 2023 Olivier Meal Planner</Text>

          <Flex justify="center" alignItems="center">
            <Box as="a" href="/team" mx={8}>
              <Text
                _hover={{
                borderBottom: "2px solid green"
                }}>
                MEET THE TEAM
              </Text>
            </Box>

            <Box as="a" href="/ContactUs" mr={8}>
            <Text
                _hover={{
                borderBottom: "2px solid green"
                }}>
              CONTACT
              </Text>
            </Box>

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
              href="https://www.instagram.com/your-username"
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
              href="https://www.facebook.com/your-username"
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
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
