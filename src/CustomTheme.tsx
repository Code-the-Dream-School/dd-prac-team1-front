import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { cardTheme } from "./Card";

//extend the theme
const theme = extendTheme({
  colors: {
    black: "#212121",
    white: "#fafafa",
    green: "#d7da5e",
    brandGray: "#f4f4eb",
    red: "#E53E3E"
  },

  fonts: {
    body: "Poppins, sans-serif",
    heading: "Stavok Grotesque, sans-serif"
  },

  components: {
    Card: cardTheme
  }
});

export default theme;
