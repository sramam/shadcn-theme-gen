import * as fs from "fs";
import * as path from "path";
import { themeColors } from "./themeColors";
import validateColors from "./validateColors";
import { generateThemes } from "./generateThemes";
import configGenerator from "./configGenerator";

const usage = () =>
  [
    `Usage: npx shadcn-theme-gen [colors] [dir]`,
    ` Generates theme files to meet shadcn-ui needs`,
    ``,
    `ARGUMENTS:`,
    `  colors - comma-separated-list (multiple themes). See below for available colors.`,
    `  dir - directory for generated files. Defaults to './themes'`,
    ``,
    `NOTES:`,
    `  - Once generated, the theme files can be renamed`,
    `  - Within tailwind.config, they can be used with or without the "theme_" prefix`,
    `  - Available colors:\n${themeColors.map((c) => `    - ${c}`).join("\n")}`,
    ``,
  ].join("\n");

export async function cli() {
  if (["-h", "--help"].includes((process.argv[2] ?? "").toLowerCase())) {
    console.log(usage());
    process.exit(0);
  }
  const { colors, invalidColors } = validateColors(
    (process.argv[2] ?? "slate,sky,neutral").split(",")
  );
  if (invalidColors.length) {
    console.error(`Invalid theme colors: ${invalidColors.join("\n")}\n`);
    console.error(`Valid colors:\n${themeColors.map((c) => `  - ${c}\n`)}`);
    process.exit(-1);
  }
  const dir = process.argv[3] ?? "./themes";

  const dst = path.resolve(dir);
  fs.mkdirSync(dst, { recursive: true });
  try {
    fs.accessSync(`${dst}/config.js`, fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    // config file does not exist
    const config = configGenerator();
    // while this seems like an anti-pattern, we are doing this to
    // preserve any previously generated config - it may have been modified
    // by the user.
    fs.writeFileSync(`${dst}/config.js`, config, "utf8");
  }

  generateThemes(colors, dst, fs.writeFileSync);
  console.log(`\ncustom shadcn-ui themes initialized to '${dir}'`);
}
