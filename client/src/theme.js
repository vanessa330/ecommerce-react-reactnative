export const colorTokens = {
  primary: {
    50: "#D3EAF7",
    100: "#A7D9EF",
    200: "#7CC9E7",
    300: "#51B9DF",
    400: "#26A9D7",
  },
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
};

export const themeSettings = (mode) => {
  const primaryColor =
    mode === "light" ? colorTokens.primary[100] : colorTokens.primary[200];
  const primaryColorDark =
    mode === "light" ? colorTokens.primary[100] : colorTokens.primary[300];
  const primaryColorLight =
    mode === "light" ? colorTokens.primary[200] : colorTokens.primary[400];

  const neutralColor =
    mode === "light" ? colorTokens.grey[500] : colorTokens.grey[200];
  const neutralColorDark =
    mode === "light" ? colorTokens.grey[700] : colorTokens.grey[100];
  const neutralColorMediumMain =
    mode === "light" ? colorTokens.grey[400] : colorTokens.grey[300];
  const neutralColorMedium =
    mode === "light" ? colorTokens.grey[300] : colorTokens.grey[400];
  const neutralColorLight =
    mode === "light" ? colorTokens.grey[50] : colorTokens.grey[700];

  const backgroundColorDefault =
    mode === "light" ? colorTokens.grey[10] : colorTokens.grey[900];
  const backgroundColorAlt =
    mode === "light" ? colorTokens.grey[0] : colorTokens.grey[800];

  return {
    palette: {
      mode: mode,
      primary: {
        dark: primaryColorDark,
        main: primaryColor,
        light: primaryColorLight,
      },
      neutral: {
        dark: neutralColorDark,
        main: neutralColor,
        mediumMain: neutralColorMediumMain,
        medium: neutralColorMedium,
        light: neutralColorLight,
      },
      background: {
        default: backgroundColorDefault,
        alt: backgroundColorAlt,
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
