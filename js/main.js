import {
  rgbToHex,
  rgbToHsl,
  rgbToString,
  hslToString,
} from "./modules/color-converter.js";
import { generateRandomColor } from "./modules/color-generator.js";

const generateButton = document.querySelector(".color-generator__generate");
const colorDisplay = document.querySelector(".color-generator__swatch");
const colorValue = document.querySelector(".color-generator__hex");
const formatButtons = document.querySelectorAll(".color-generator__format");

let currentColor = null;
let currentFormat = "hex";

function updateColor() {
  currentColor = generateRandomColor();

  const hex = rgbToHex(currentColor);

  colorDisplay.style.background = hex;

  updateColorValue();
}

function updateColorValue() {
  if (currentFormat === "hex") {
    colorValue.textContent = rgbToHex(currentColor);
  } else if (currentFormat === "rgb") {
    colorValue.textContent = rgbToString(currentColor);
  } else if (currentFormat === "hsl") {
    colorValue.textContent = hslToString(rgbToHsl(currentColor));
  }
}

function setActiveFormat(selectedButton) {
  formatButtons.forEach((button) => {
    button.classList.remove("color-generator__format--active");
  });

  selectedButton.classList.add("color-generator__format--active");
}

formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFormat = button.dataset.format;

    setActiveFormat(button);
    updateColorValue();
  });
});

generateButton.addEventListener("click", updateColor);
