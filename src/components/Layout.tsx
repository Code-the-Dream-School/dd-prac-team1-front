import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Button,
//  Input,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { NavLink, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/fetchData"

export default function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    .then(result => {
      if (result.status === 200) {
        console.log(result)
        sessionStorage.removeItem("jwtToken");
        navigate("/");
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack width="95%" display="flex" justifyContent="space-between" ml="1rem" alignItems="center">
            <Box>Olivier Logo</Box>
            <HStack display={{ base: "none", md: "flex" }} justifyContent={"flex-end"} spacing={20}>
              {/* <Input
                  size="sm"
                  width="auto"
                  type="text"
                  placeholder="Search a recipe..."
                  id="search"
                  variant="outline"
                /> */}
              <HStack as={"nav"} spacing={20} display={{ base: "none", md: "flex" }} justifyContent={"flex-end"}>
                {/* <NavLink to={""}>ADD RECIPE</NavLink>
                <NavLink to={""} >SAVED</NavLink>
                <NavLink to={""}>MENU</NavLink>
                <NavLink to={""}>SHOPPING</NavLink> */}
                <NavLink onClick={handleLogout} to={""}>LOGOUT</NavLink>
              </HStack>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{base: "flex", md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* <NavLink to={""}>ADD RECIPE</NavLink>
              <NavLink to={""} >SAVED</NavLink>
              <NavLink to={""}>MENU</NavLink>
              <NavLink to={""}>SHOPPING</NavLink> */}
              <Button onClick={handleLogout}>LOGOUT</Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Outlet/>
    </>
  )
}

