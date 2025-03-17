import { createTheme, lightColors, darkColors } from "@rneui/themed";
import { Dimensions } from "react-native";

export interface IColors {
  primary: string;
  secondary: string;
  background: string;
  white: string;
  black: string;
  grey0: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  grey5: string;
  modal: string;
  greyOutline: string;
  searchBg: string;
  success: string;
  warning: string;
  error: string;
  disabled: string;
  divider: string;
  cardBg: string;
}

export interface Theme {
  colors: IColors;
  mode: "light" | "dark";
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    sm: number;
    md: number;
    lg: number;
  };
}
export const colors = {
  white: "rgb(248, 247, 250)",
  black: "rgb(15, 15, 15)",
}

export const theme = createTheme({
  mode: "light" as "light" | "dark",
  lightColors: {
    ...lightColors,
    background: "rgb(248, 247, 250)",
    primary: "#252525",
    secondary: "#D4AF35",
    greyOutline: "rgb(133, 131, 138)",
    divider: "rgb(79, 83, 103)",
    grey0: "rgb(15, 15, 15)",
    grey3: "#8F8F8F",
    searchBg: "rgba(248, 247, 250, 0.7)",
    white: "rgb(248, 247, 250)",
    black: "rgb(15, 15, 15)",
    success: "#00C851", // Define success color
    error: "#ff4444", // Define error color
    warning: "#FFBB33", // Define warning color
    cardBg: "rgba(212, 175, 53, 0.4)",
    modal: "rgba(15, 15, 15, 0.6)",
  },
  darkColors: {
    ...darkColors,
    background: "#252525",
    primary: "#D4AF35",
    secondary: "#8F8F8F",
    greyOutline: "rgb(144, 157, 170)",
    divider: "rgb(229, 229, 230)",
    grey0: "rgb(241, 241, 241)",
    grey3: "#8F8F8F",
    searchBg: "rgba(37, 37, 37, 0.7)",
    white: "rgb(248, 247, 250)",
    black: "rgb(15, 15, 15)",
    success: "#00C851", // Define success color
    error: "#ff4444", // Define error color
    warning: "#FFBB33", // Define warning color
    cardBg: "rgba(37, 37, 37, 0.7)",
    modal: "rgba(15, 15, 15, 0.6)",
  },
  components: {
    CheckBox: (props, theme) => ({
      checkedColor: theme.colors.primary,
      size: 25,
      containerStyle: {
        backgroundColor: "transparent",
        padding: 0,
        borderRadius: 5,
      },
      textStyle: {
        fontSize: 13,
        color: theme.colors.grey0,
        fontWeight: "bold",
      },
    }),
    Button: (props, theme) => ({
      titleStyle: {
        fontWeight: "bold",
      },
      containerStyle: {
        width: "100%",
        paddingHorizontal: 10,
        borderWidth: props.type === "outline" ? 1 : 0,
        borderColor:
          props.type === "outline"
            ? props.color === "success"
              ? theme.colors.success
              : props.color === "error"
              ? theme.colors.error
              : props.color === "warning"
              ? theme.colors.warning
              : props.color === "primary"
              ? theme.colors.primary
              : theme.colors.greyOutline // Set default outline color if no match
            : theme.colors.primary, // Set default border color for other button types
        backgroundColor: props.type === "outline" ? "transparent" : undefined,
      },
      textStyle: {
        color:
          props.type === "outline"
            ? props.color === "success"
              ? theme.colors.success
              : props.color === "error"
              ? theme.colors.error
              : props.color === "warning"
              ? theme.colors.warning
              : props.color === "primary"
              ? theme.colors.primary
              : theme.colors.grey0 // Set default text color for outline type if no match
            : theme.colors.secondary, // Set default text color for other button types
      },
    }),
    Text: (props, theme) => ({
      h1Style: {
        fontSize: 24,
      },
      h2Style: {
        fontSize: 20,
      },
      style: {
        color: theme.colors.grey0,
      },
    }),
    Divider: (props, theme) => ({
      color: theme.colors.divider,
    }),
    Card: (props, theme) => ({
      containerStyle: {
        borderColor: theme.colors.divider,
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: theme.colors.searchBg,
        boxShadow: "0px 0px 5px 0px rgb(60, 64, 85)",
      },
    }),
    Chip: (props, theme) => ({
      color: props.color === "success" ? theme.colors.success : props.color === "error" ? theme.colors.error : props.color === "warning" ? theme.colors.warning : theme.colors.grey0,
      containerStyle: {
        borderWidth: props.type === "outline" ? 1 : 0,
        borderColor: props.color === "success" ? theme.colors.success : props.color === "error" ? theme.colors.error : props.color === "warning" ? theme.colors.warning : theme.colors.greyOutline,
        backgroundColor: props.type === "outline" ? "transparent" : undefined, // Set background to transparent for outline type
      },
      textStyle: {
        color: props.color === "success" ? theme.colors.success : props.color === "error" ? theme.colors.error : props.color === "warning" ? theme.colors.warning : props.color, // Set text color to the specified color for outline type
      },
      titleStyle: {
        borderWidth: 0, // Remove border from the title text
      },
    }),
    Dialog: (props, theme) => ({
      isVisible: true,
      collapsable: true,
      animationType: "slide",
      keyboardDismissMode: "on-drag",
      overlayStyle: {
        backgroundColor: theme.colors.background,
        padding: 30,
      },
      containerStyle: {
        backgroundColor: theme.colors.background,
        borderRadius: 5,
        width: "80%",
        maxWidth: 500,
        minWidth: 300,
        maxHeight: "80%",
        overflow: "hidden",
        margin: 0,
      },
      backdropStyle: {
        backgroundColor: "transparent",
      },
      titleStyle: {
        color: theme.colors.grey0,
      },
    }),
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
});

export const Fonts = {
  whiteColor14Medium: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },

  whiteColor14Bold: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },

  whiteColor16Regular: {
    fontSize: 16,
    fontFamily: "Poppins",
  },

  whiteColor16Bold: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },

  whiteColor20Medium: {
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  },
  
  whiteColor20Bold: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },

  primaryColor14Medium: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },

  primaryColor14Bold: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
  },

  primaryColor16Regular: {
    fontSize: 16.0,
    fontFamily: "Poppins",
  },

  primaryColor16Medium: {
    fontSize: 16.0,
    fontFamily: "PoppinsMedium",
  },

  primaryColor16Bold: {
    fontSize: 16.,
    fontFamily: "PoppinsBold",
  },

  primaryColor20Medium: {
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  },
  
  primaryColor20Bold: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },

  grayColor14Regular: {
    fontSize: 14,
    fontFamily: "Poppins",
  },

  grayColor14Medium: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },

  grayColor16Medium: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },

  grayColor20Medium: {
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  },

  grayColor14Bold: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
  },

  grayColor16Regular: {
    fontSize: 16,
    fontFamily: "Poppins",
  },

  grayColor16Bold: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },

  grayColor20Bold: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },

  greenColor17Medium: {
    color: theme.mode === "dark" ? theme.darkColors?.success : theme.lightColors?.success,
    fontSize: 17.0,
    fontFamily: "PoppinsMedium",
  },

  redColor17Medium: {
    color: theme.mode === "dark" ? theme.darkColors?.error : theme.lightColors?.error,
    fontSize: 17.0,
    fontFamily: "PoppinsMedium",
  },

  purpleColor17Medium: {
    color: theme.mode === "dark" ? theme.darkColors?.secondary : theme.lightColors?.secondary,
    fontSize: 17.0,
    fontFamily: "PoppinsMedium",
  },
};

export const Sizes = {
  fixPadding: 16.0,
};

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const commonStyles = {
  buttonStyle: {
    backgroundColor: theme.mode === "dark" ? theme.darkColors?.primary : theme.lightColors?.primary,
    borderRadius: Sizes.fixPadding * 4.0,
    margin: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding - 2.0,
  },
  exitInfoWrapStyle: {
    backgroundColor: theme.mode === "dark" ? theme.darkColors?.background : theme.lightColors?.background,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 4.0,
    paddingHorizontal: Sizes.fixPadding + 10.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
};