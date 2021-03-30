import theme from "styled-theming";

export const appTheme = {
  black: "#000",
  dullBlack: "#202124",
  lightBlue: "#3498db",
  darkGrey: "#5f6368",
  dullGrey: "#909090",
  grey: "#ccc",
  lightGrey: "#f0f3f6",
  lightYellow: "#feefc3",
  darkYellow: "#41331c",
  orange: "#FFA500",
  snowWhite: "#f2f5f8",
  secondaryGrey: "rgba(255,255,255,.3)",
  white: "#fff",
};

export const background = theme("theme", {
  light: appTheme.white,
  dark: appTheme.dullBlack,
});

export const textColor = theme("theme", {
  light: appTheme.dullBlack,
  dark: appTheme.white,
});

export const iconBackground = theme("theme", {
  light: appTheme.snowWhite,
  dark: appTheme.secondaryGrey,
});

export const borderColor = theme("theme", {
  light: appTheme.grey,
  dark: appTheme.dullGrey,
});
