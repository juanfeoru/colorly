import {
  rgbToHex,
  rgbToHsl,
  rgbToString,
  hslToString,
} from "./modules/color-converter.js";
import { generateRandomColor } from "./modules/color-generator.js";
import {
  addToHistory,
  clearHistory,
  renderHistory,
} from "./modules/color-history.js";
import { state } from "./state.js";

const generateButton = document.querySelector(".color-generator__generate");
const colorDisplay = document.querySelector(".color-generator__swatch");
const colorValue = document.querySelector(".color-generator__hex");
const formatButtons = document.querySelectorAll(".color-generator__format");
const historyList = document.querySelector(".color-history__list");
const historyClear = document.querySelector(".color-history__clear");
const copyButton = document.querySelector(".color-generator__copy");
const copyMessage = document.querySelector(".color-generator__hint");
const toast = document.querySelector(".toast");

const channelValues = document.querySelectorAll(
  ".color-generator__channel-value",
);
const channelProgress = document.querySelectorAll(
  ".color-generator__channel-progress",
);

const formatters = {
  hex: rgbToHex,
  rgb: rgbToString,
  hsl: (color) => hslToString(rgbToHsl(color)),
};

function updateColor() {
  state.currentColor = generateRandomColor();

  addToHistory(state.colorHistory, state.currentColor, state.maxHistory);

  updateUI();
  renderHistory(state.colorHistory, historyList);
}

function updateUI() {
  colorDisplay.style.background = rgbToHex(state.currentColor);
  updateColorValue();
  updateRgbChannels();
}

function updateColorValue() {
  colorValue.textContent = getCurrentColorValue();
}

function getCurrentColorValue() {
  const formatter = formatters[state.currentFormat];

  return formatter(state.currentColor);
}

async function copyColor() {
  const color = getCurrentColorValue();

  try {
    await navigator.clipboard.writeText(color);

    copyMessage.textContent = "Copied!";

    setTimeout(() => {
      copyMessage.textContent = "Click to copy code";
    }, 1500);

    showToast();
  } catch (error) {
    console.error("Failed to copy color:", color);
  }
}

function showToast() {
  toast.classList.add("toast--visible");

  setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 1500);
}

function setActiveFormat(selectedButton) {
  formatButtons.forEach((button) => {
    button.classList.remove("color-generator__format--active");
  });

  selectedButton.classList.add("color-generator__format--active");
}

function updateRgbChannels() {
  const channels = {
    red: state.currentColor.r,
    green: state.currentColor.g,
    blue: state.currentColor.b,
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
    state.currentFormat = button.dataset.format;

    setActiveFormat(button);
    updateColorValue();
  });
});

function handleClearHistory() {
  clearHistory(state.colorHistory);
  renderHistory(state.colorHistory, historyList);
}

historyClear.addEventListener("click", handleClearHistory);

generateButton.addEventListener("click", updateColor);

copyButton.addEventListener("click", copyColor);

updateUI();
