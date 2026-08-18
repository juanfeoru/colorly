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
const historyList = document.querySelector(".color-history__list");
const historyClear = document.querySelector(".color-history__clear");

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
const MAX_HISTORY = 4;
let colorHistory = [];

const formatters = {
  hex: rgbToHex,
  rgb: rgbToString,
  hsl: (color) => hslToString(rgbToHsl(color)),
};

function renderHistory() {
  historyList.replaceChildren();

  colorHistory.forEach((item) => {
    const hex = rgbToHex(item.color);

    const button = document.createElement("button");
    button.classList.add("color-history__item");
    button.type = "button";

    const swatch = document.createElement("div");
    swatch.classList.add("color-history__swatch");
    swatch.style.background = hex;
    swatch.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.classList.add("color-history__info");

    const code = document.createElement("span");
    code.classList.add("color-history__code");
    code.textContent = hex.toUpperCase();

    const time = document.createElement("span");
    time.classList.add("color-history__time");
    time.textContent = item.createdAt.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    info.append(code, time);
    button.append(swatch, info);
    historyList.append(button);
  });
}

function updateColor() {
  currentColor = generateRandomColor();

  addToHistory(currentColor);

  updateUI();
  renderHistory();
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

function addToHistory(color) {
  colorHistory.unshift({
    color: { ...color },
    createdAt: new Date(),
  });

  if (colorHistory.length > MAX_HISTORY) {
    colorHistory.pop();
  }
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

function clearHistory() {
  colorHistory.length = 0;

  renderHistory();
}

formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFormat = button.dataset.format;

    setActiveFormat(button);
    updateColorValue();
  });
});

historyClear.addEventListener("click", clearHistory);

generateButton.addEventListener("click", updateColor);

updateUI();
