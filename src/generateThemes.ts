import { ThemeColors } from "./themeColors";
import { themeGenerator } from "./themeGenerator";

export function generateThemes(
  colors: ThemeColors[],
  dst: string,
  writeFileSync: (fPath: string, data: string, encoding: "utf8") => void
) {
  console.log(`Generating themes:`);
  colors.forEach((color, idx) => {
    const themeCss = themeGenerator(color);
    writeFileSync(`${dst}/theme_${color}.css`, themeCss, "utf8");
    console.log(`  - ${color} ${idx === 0 ? "(default)" : ""}`);
  });
  // set the first theme in our list to be the default
  writeFileSync(
    `${dst}/default.css`,
    `@import url("./theme_${colors[0]}.css");`,
    "utf8"
  );
}
