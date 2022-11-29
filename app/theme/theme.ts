import { extendTheme } from "@chakra-ui/react";
//import { theme as baseTheme } from "@saas-ui/pro";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
        backgroundColor: "#ececec"
      },
      a: {
        color: "black.500"
      }
    }
  },

  fontSizes: {
    "3xs": "0.45rem",
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "1rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  },
  DataGrid: {
    variants: {
      stripe: {
        th: "",
        tr: ""
      }
    }
  },
  defaultProps: {
    size: "md",
    variant: "",
    colorScheme: "blue"
  },
  components: {
    FormInput: {
      defaultProps: { _invalid: { border: "green" } }
    },

    Sidebar: {
      variants: {
        default: {
          container: {
            m: 0,
            p: 0
          }
        },
        condensed: {
          container: {
            bgColor: "#ececec",
            border: "none",
            py: 0,
            m: 0
          },
          section: {
            px: 0
          }
        }
      }
    },
    NavItem: {
      baseStyle: {
        item: {
          m: "0px",
          px: "0px",
          py: "4px"
        },
        link: {
          rounded: "none"
          // roundedTopRight: 'md',
          // roundedBottomRight: 'md',
        }
      },
      variants: {
        // neutral: ({ isActive }) => {
        //   return {
        //     icon: {
        //       color: "#2037f1"
        //     }
        //     // link: {
        //     //    bg: "#f1f1f1",
        //     //  }
        //   };
        // }
      }
    }
  }
}, baseTheme);
