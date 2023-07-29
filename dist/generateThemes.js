"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateThemes = void 0;
const themeGenerator_1 = require("./themeGenerator");
function generateThemes(colors, dst, writeFileSync) {
    console.log(`Generating themes:`);
    colors.forEach((color, idx) => {
        const themeCss = (0, themeGenerator_1.themeGenerator)(color);
        writeFileSync(`${dst}/theme_${color}.css`, themeCss, "utf8");
        console.log(`  - ${color} ${idx === 0 ? "(default)" : ""}`);
    });
    // set the first theme in our list to be the default
    writeFileSync(`${dst}/default.css`, `@import url("./theme_${colors[0]}.css");`, "utf8");
}
exports.generateThemes = generateThemes;
//# sourceMappingURL=generateThemes.js.map