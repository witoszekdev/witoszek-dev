import defaultTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index";
import { tailwind } from "@theme-ui/presets";

export default {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    error: tailwind.colors.red,
    buttonText: "white",
    buttonBg: defaultTheme.colors.primary,
    buttonHoverText: "white",
    modes: {
      dark: {
        ...defaultTheme.colors.modes.dark,
        error: tailwind.colors.red[4],
        buttonText: tailwind.colors.purple[9],
        buttonBg: tailwind.colors.purple[4],
        primaryHover: tailwind.colors.blue[2],
        buttonHoverText: tailwind.colors.blue[9],
      },
    },
  },
  buttons: {
    ...tailwind.buttons,
    elevated: {
      ...tailwind.buttons.elevated,
      color: "buttonText",
      backgroundColor: "buttonBg",
      border: "none",
      "&:hover": {
        color: "buttonHoverText",
        backgroundColor: "primaryHover",
      },
    },
  },
  inputs: {
    ...tailwind.inputs,
    pill: {
      variant: "forms.input",
      borderColor: "secondary",
      color: "text",
      fontFamily: "body",
      "::placeholder": {
        color: "secondary",
      },
      "&:focus": {
        outline: "none",
        borderColor: "primary",
      },
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 30px highlight inset !important",
      },
    },
    pillError: {
      variant: "inputs.pill",
      borderColor: "error",
      color: "red.7",
    },
    underlineError: {
      variant: "inputs.underline",
      borderBottomColor: "error",
      color: "error",
      "&:focus": {
        outline: "none",
        borderColor: "error",
        backgroundColor: "white",
      },
    },
  },
  useColorSchemeMediaQuery: true,
};
