import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useToast,
  Stack,
  Button,
  Image
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/fetchData";
import RecipeSearch from "../Search/RecipeSearch";
import styled from "styled-components";
import { useEffect, useRef } from "react";

type LayoutProps = {
  isActive?: any;
};

const AnimatedUnderlineText = styled.a<LayoutProps>`
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
    width: ${({ isActive }) => (isActive ? "100%" : "0")};
    height: 2px;
    background-color: #d7da5e;
    transition: width 0.3s ease-in-out;
  }
`;

export default function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const navbarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen, onClose]);

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
      <Box
        bg="brandGray"
        className="navbar"
        ref={navbarRef}
        px={4}
        pt={{ base: "4", sm: "0" }}>
        <Flex
          h={{ base: "28", sm: "16" }}
          alignItems={{ base: "flex-start", sm: "center" }}>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            width="95%"
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            ml={{ base: "20px", sm: "1rem" }}
            alignItems={{ base: "flex-start", sm: "center" }}>
            <Box>
              <Image
                src="/images/Logo_Olivier.svg"
                maxW="100%"
                minWidth={{ sm: "150px" }}
                h="auto"
                cursor="pointer"
                onClick={() => {
                  navigate("/search-choice");
                }}
              />
            </Box>
            <Box ml={{ base: "-20", sm: "0" }}>
              <RecipeSearch />
            </Box>
            <HStack display={{ base: "none", lg: "flex" }} flexGrow={1}>
              <HStack as={"nav"} flexGrow={1}>
                <Flex justifyContent="center" flexGrow={1}>
                  <AnimatedUnderlineText
                    href="/search-choice"
                    isActive={location.pathname === "/search-choice"}>
                    ADD RECIPE
                  </AnimatedUnderlineText>
                </Flex>
                <Flex justifyContent="center" flexGrow={1}>
                  <AnimatedUnderlineText
                    href="/saved-recipes"
                    isActive={location.pathname === "/saved-recipes"}>
                    SAVED
                  </AnimatedUnderlineText>
                </Flex>
                <Flex justifyContent="center" flexGrow={1}>
                  <AnimatedUnderlineText
                    href="/planner"
                    isActive={location.pathname === "/planner"}>
                    PLANNER
                  </AnimatedUnderlineText>
                </Flex>
                <Flex justifyContent="center" flexGrow={1}>
                  <AnimatedUnderlineText
                    href="/shopping-list"
                    isActive={location.pathname === "/shopping-list"}>
                    SHOPPING
                  </AnimatedUnderlineText>
                </Flex>
                <Flex justifyContent="center" flexGrow={1}>
                  <AnimatedUnderlineText onClick={handleLogout}>
                    LOGOUT
                  </AnimatedUnderlineText>
                </Flex>
              </HStack>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb="4" display="flex">
            <Stack as={"nav"} spacing="4" onClick={onClose}>
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
