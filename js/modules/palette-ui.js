import { rgbToHex } from "./color-converter.js";

export function updatePalette(elements, palette) {
  palette.forEach((color, index) => {
    const hex = rgbToHex(color);

    elements.colors[index].dataset.color = hex;
    elements.swatches[index].style.backgroundColor = hex;
    elements.codes[index].textContent = hex.toUpperCase();
  });
}
