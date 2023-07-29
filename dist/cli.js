"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const themeColors_1 = require("./themeColors");
const validateColors_1 = __importDefault(require("./validateColors"));
const generateThemes_1 = require("./generateThemes");
const configGenerator_1 = __importDefault(require("./configGenerator"));
const usage = () => [
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
    `  - Available colors:\n${themeColors_1.themeColors.map((c) => `    - ${c}`).join("\n")}`,
    ``,
].join("\n");
function cli() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (["-h", "--help"].includes(((_a = process.argv[2]) !== null && _a !== void 0 ? _a : "").toLowerCase())) {
            console.log(usage());
            process.exit(0);
        }
        const { colors, invalidColors } = (0, validateColors_1.default)(((_b = process.argv[2]) !== null && _b !== void 0 ? _b : "slate,sky,neutral").split(","));
        if (invalidColors.length) {
            console.error(`Invalid theme colors: ${invalidColors.join("\n")}\n`);
            console.error(`Valid colors:\n${themeColors_1.themeColors.map((c) => `  - ${c}\n`)}`);
            process.exit(-1);
        }
        const dir = (_c = process.argv[3]) !== null && _c !== void 0 ? _c : "./themes";
        const dst = path.resolve(dir);
        fs.mkdirSync(dst, { recursive: true });
        try {
            fs.accessSync(`${dst}/config.ts`, fs.constants.R_OK | fs.constants.W_OK);
        }
        catch (err) {
            // config file does not exist
            const config = (0, configGenerator_1.default)();
            // while this seems like an anti-pattern, we are doing this to
            // preserve any previously generated config - it may have been modified
            // by the user.
            fs.writeFileSync(`${dst}/config.ts`, config, "utf8");
        }
        (0, generateThemes_1.generateThemes)(colors, dst, fs.writeFileSync);
        console.log(`\ncustom shadcn-ui themes initialized to '${dir}'`);
    });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map