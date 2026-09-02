import { rgbToHex } from "./color-converter.js";

export function renderExtractedColors(colors, container) {
  container.replaceChildren();

  colors.forEach((color) => {
    const hex = rgbToHex(color);

    const div = document.createElement("div");
    div.classList.add("image-extractor__color");
    div.dataset.color = hex;

    const swatch = document.createElement("span");
    swatch.classList.add("image-extractor__swatch");
    swatch.style.backgroundColor = hex;
    swatch.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.classList.add("image-extractor__info");

    const code = document.createElement("span");
    code.classList.add("image-extractor__code");
    code.textContent = hex.toUpperCase();

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.classList.add("image-extractor__copy");
    copyButton.setAttribute("aria-label", `Copy ${hex}`);
    copyButton.dataset.color = hex;
    copyButton.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path
          d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2"
        />
        <path
          d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"
        />
      </svg>
    `;

    info.append(code, copyButton);
    div.append(swatch, info);
    container.append(div);
  });
}
