import {
  Box,
  Button,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { ReactNode, useState } from "react";

const SocialButton = ({
  children,
  label,
  href
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue("gray.100", "gray.900")} px={4}
      rounded={"full"}
      w={10}
      h={10}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}>
        <Text>
          © 2023 Olivier. All rights reserved
        </Text>
         
        <Stack direction={"row"} justify={"right"} spacing={8}>
          <Box as="a" href={"/OurTeam"}>
            MEET THE TEAM
          </Box>
          <Box as="a" href={"/Contact"}>
            CONTACT
          </Box>
        </Stack>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Github"} href={"#"}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={"Facebook"} href={"#"}>
            <FaFacebook />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
