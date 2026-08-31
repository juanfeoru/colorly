import { rgbToHex } from "./color-converter.js";

export function renderExtractedColors(colors, container) {
  container.replaceChildren();

  colors.forEach((color) => {
    const hex = rgbToHex(color);

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("image-extractor__color");
    button.dataset.color = hex;

    const swatch = document.createElement("span");
    swatch.classList.add("image-extractor__swatch");
    swatch.style.backgroundColor = hex;
    swatch.setAttribute("aria-hidden", "true");

    const code = document.createElement("span");
    code.classList.add("image-extractor__code");
    code.textContent = hex.toUpperCase();

    button.append(swatch, code);
    container.append(button);
  });
}
