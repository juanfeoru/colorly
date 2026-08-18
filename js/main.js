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

const channelValues = document.querySelectorAll(
  ".color-generator__channel-value",
);
const channelProgress = document.querySelectorAll(
  ".color-generator__channel-progress",
);

let initialColor = {
  r: 255,
  g: 87,
  b: 51,
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

  updateUI();
}

function updateUI() {
  colorDisplay.style.background = rgbToHex(currentColor);
  updateColorValue();
  updateRgbChannels();
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

function updateRgbChannels() {
  const channels = {
    red: currentColor.r,
    green: currentColor.g,
    blue: currentColor.b,
  };

  channelValues.forEach((element) => {
    const channel = element.dataset.channel;
    element.textContent = channels[channel];
  });

  channelProgress.forEach((element) => {
    const channel = element.dataset.channel;
    const percentage = Math.round((channels[channel] / 255) * 100);

    element.style.width = `${percentage}%`;
  });
}

formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFormat = button.dataset.format;

    setActiveFormat(button);
    updateColorValue();
  });
});

generateButton.addEventListener("click", updateColor);

updateUI();
