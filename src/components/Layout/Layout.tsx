import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useToast,
  Stack,
  Button,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/fetchData";
import RecipeSearch from "../Search/RecipeSearch";
import styled from "styled-components";

const AnimatedUnderlineText = styled.a`
position: relative;
display: inline-block;
text-decoration: none;
color: #333;
cursor: pointer;

&:hover::before {
  width: 100%;
}

&:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #d7da5e;
  transition: width 0.3s ease-in-out;
}
`;

export default function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const toast = useToast();

  const handleLogout = () => {
    logout()
      .then(result => {
        if (result.status === 200) {
          console.log(result);
          sessionStorage.clear();
          navigate("/");
        }
      })
      .catch(error => {
        console.log(error);
        toast({
          title: "Error",
          description: "Logout failed",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      });
  };

  return (
    <>
      <Box bg="brandGray" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            width="95%"
            display="flex"
            justifyContent="space-between"
            ml="1rem"
            alignItems="center">
            <Box>
              <Image borderRadius="sm" src="/images/Logo_Olivier.svg" />
            </Box>
            <HStack>
              <RecipeSearch />
            </HStack>
            <HStack
              display={{ base: "none", md: "flex" }}
              justifyContent={"flex-end"}
              spacing={20}>
              <HStack
                as={"nav"}
                spacing={20}
                display={{ base: "none", md: "flex" }}
                justifyContent={"flex-end"}>
                <AnimatedUnderlineText href="/search-choice">ADD RECIPE</AnimatedUnderlineText>
                <AnimatedUnderlineText href="/saved-recipes">SAVED</AnimatedUnderlineText>
                <AnimatedUnderlineText href="/planner">PLANNER</AnimatedUnderlineText>
                <AnimatedUnderlineText href="/shopping-list">SHOPPING</AnimatedUnderlineText>
                <AnimatedUnderlineText onClick={handleLogout}>LOGOUT</AnimatedUnderlineText>
              </HStack>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ base: "flex", md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink to="/search-choice">ADD RECIPE</NavLink>
              <NavLink to="/saved-recipes">SAVED</NavLink>
              <NavLink to="/planner">PLANNER</NavLink>
              <NavLink to="/shopping-list">SHOPPING</NavLink>
              <Button onClick={handleLogout}>LOGOUT</Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Outlet />
    </>
  );
}
