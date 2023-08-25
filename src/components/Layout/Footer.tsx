import {
  Box,
  Flex,
  Text,
  IconButton,
  Container,
  useBreakpointValue
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const iconSize = useBreakpointValue({ base: "1rem", md: "1.5rem" });

  return (
    <Box
      as="footer"
      py={4}
      height={{ base: "auto", md: "70px" }}
      width="100%"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      // alignItems="center"
      marginTop="auto"
      bg="brandGray"
      color="black">
      <Container maxW="7xl">
        <Flex
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          flexWrap="wrap">
          <Text
            pl={{ base: 0, md: 0 }}
            mb={{ base: 2, md: 0 }}
            textAlign="center">
            &copy; 2023 Olivier Meal Planner
          </Text>

          <Box
            as="a"
            href="/team"
            mx={{ base: 0, md: 10 }}
            mb={{ base: 2, md: 0 }}
            textAlign={{ base: "center", md: "right" }}>
            <Text
              _hover={{
                borderBottomColor: "green",
                borderBottomWidth: "2px",
                borderBottomStyle: "solid"
              }}
              fontSize={{ base: "sm", md: "md" }}>
              MEET THE TEAM
            </Text>
          </Box>

          <Box
            as="a"
            href="/Contact"
            mx={{ base: 0, md: 10 }}
            mb={{ base: 2, md: 0 }}
            textAlign={{ base: "center", md: "right" }}>
            <Text
              _hover={{
                borderBottomColor: "green",
                borderBottomWidth: "2px",
                borderBottomStyle: "solid"
              }}
              fontSize={{ base: "sm", md: "md" }}>
              CONTACT
            </Text>
          </Box>
        </Flex>

        <Flex
          // justify={{ base: "center", md: "flex-end" }}
          alignItems={{ base: "center", md: "flex-end" }}
          mt={{ base: 2, md: 0 }}>
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
            mx={3}
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
