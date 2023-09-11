import { cardTheme } from "./Card";
import { extendTheme } from "@chakra-ui/react";

//extend the theme
const theme = extendTheme({
  colors: {
    black: "#212121",
    white: "#fafafa",
    green: "#d7da5e",
    brandGray: "#f4f4eb",
    lightGray: "#FFFFF9",
    customGray: "#A6A6A6",
    customRed: "#E53E3E"
  },

  fonts: {
    body: "Poppins, sans-serif",
    heading: "Stavok Grotesque, sans-serif"
  },

  components: {
    Card: cardTheme,
    Button: {
      variants: {
        solid: {
          bg: "green"
        },
        outline: {
          bg: "brandGray",
          borderColor: "green"
        },
        ghost: {
          _hover: {
            bg: "white"
          },
          _active: {
            bg: "white"
          }
        }
      }
    },

    Input: {
      variants: {
        outline: {
          field: {
            "bg": "white",
            "borderColor": "green",
            "borderRadius": "5px",
            ":focus": {
              borderColor: "green",
              bg: "brandGray",
              borderRadius: "5px"
            }
          }
        },
        filled: {
          field: {
            "bg": "brandGray",
            "borderColor": "green",
            "borderRadius": "5px",
            ":focus": {
              borderColor: "green"
            }
          }
        },
        flushed: {
          field: {
            "bg": "white",
            "borderColor": "green",
            ":focus": {
              borderColor: "green",
              bg: "brandGray"
            }
          }
        }
      }
    },
    Select: {
      variants: {
        outline: {
          field: {
            "bg": "white",
            "borderColor": "green",
            "borderRadius": "5px",
            ":focus": {
              borderColor: "green",
              bg: "brandGray",
              borderRadius: "5px"
            }
          }
        }
      }
    },
    Textarea: {
      variants: {
        outline: {
          borderColor: "green"
        }
      }
    },
    Modal: {
      variants: {
        outline: {
          borderColor: "green",
          bg: "brandGray"
        }
      }
    }
  }
});

export default theme;
