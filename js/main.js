import { rgbToHex } from "./modules/color-converter.js";
import { generateRandomColor } from "./modules/color-generator.js";

const color = generateRandomColor();

console.log(color);
console.log(rgbToHex(color));
