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

let initialColor = {
  r: 79,
  g: 32,
  b: 250,
};
let currentColor = initialColor;
let currentFormat = "hex";

const formatters = {
  hex: rgbToHex,
  rgb: rgbToString,
  hsl: (color) => hslToString(rgbToHsl(color)),
};

function updateColor() {
  currentColor = generateRandomColor();

  colorDisplay.style.background = rgbToHex(currentColor);

  updateColorValue();
}

function updateColorValue() {
  const formatter = formatters[currentFormat];

  colorValue.textContent = formatter(currentColor);
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
