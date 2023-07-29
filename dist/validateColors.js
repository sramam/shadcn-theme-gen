"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const themeColors_1 = require("./themeColors");
function validateColors(inputColors) {
    let invalidColors = [];
    const colors = inputColors
        .filter((c) => {
        if (themeColors_1.themeColors.includes(c)) {
            return true;
        }
        invalidColors.push(c);
        return false;
    })
        .map((c) => c);
    return { colors, invalidColors };
}
exports.default = validateColors;
//# sourceMappingURL=validateColors.js.map