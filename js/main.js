import {
  rgbToHex,
  rgbToHsl,
  rgbToString,
  hslToString,
} from "./modules/color-converter.js";
import { generateRandomColor } from "./modules/color-generator.js";

const color = generateRandomColor();

const hex = rgbToHex(color);
const hsl = rgbToHsl(color);

console.log(hex);
console.log(rgbToString(color));
console.log(hslToString(hsl));
