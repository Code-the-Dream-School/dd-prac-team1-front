import {
  Box,
  Container,
  Flex,
  IconButton,
  Stack,
  Text,
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
      bg="brandGray"
      color="black"
      marginTop="auto">
      <Container
        maxW="6xl"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center">
        <Stack
          mx={{ base: 0, md: 2 }}
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
          fontSize="sm">
          <Text>&copy; 2023 Olivier Meal Planner</Text>
        </Stack>

        <Stack
          as="a"
          href="/Documents/Olivier_Terms.pdf"
          target="_blank"
          mx={{ base: 0, md: 0 }}
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "right" }}>
          <Text
            _hover={{
              borderBottomColor: "green",
              borderBottomWidth: "2px",
              borderBottomStyle: "solid"
            }}
            fontSize="sm">
            Terms of Service
          </Text>
        </Stack>

        <Stack
          as="a"
          href="/team"
          mx={{ base: 0, md: 0 }}
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "right" }}>
          <Text
            _hover={{
              borderBottomColor: "green",
              borderBottomWidth: "2px",
              borderBottomStyle: "solid"
            }}
            fontSize="sm">
            Meet The Team
          </Text>
        </Stack>

        <Stack
          as="a"
          href="/Contact"
          mx={{ base: 0, md: 0 }}
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "right" }}>
          <Text
            _hover={{
              borderBottomColor: "green",
              borderBottomWidth: "2px",
              borderBottomStyle: "solid"
            }}
            fontSize="sm">
            Contact
          </Text>
        </Stack>

        <Flex mt={{ base: 2, md: 0 }}>
          <IconButton
            as="a"
            href="https://github.com/Code-the-Dream-School/dd-prac-team1-front"
            target="_blank"
            aria-label="GitHub"
            icon={<FaGithub />}
            fontSize={iconSize}
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
            fontSize={iconSize}
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
            fontSize={iconSize}
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
