import { ThemeColors, themeColors } from "./themeColors";


export default function validateColors(inputColors: string[]) {
  let invalidColors: string[] = [];
  const colors = inputColors
    .filter((c) => {
      if (themeColors.includes(c)) {
        return true;
      }
      invalidColors.push(c);
      return false;
    })
    .map((c) => c as ThemeColors);
  return { colors, invalidColors };
}
