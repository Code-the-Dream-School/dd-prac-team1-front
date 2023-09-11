import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "brandGray",
    borderColor: "green",
    borderWidth: "2px"
  },
  header: {
    paddingBottom: "2px"
  },
  body: {
    paddingTop: "2px"
  },
  footer: {
    paddingTop: "4px"
  }
});

// export the component theme
export const cardTheme = defineMultiStyleConfig({
  baseStyle
});
