import { state } from "./state.js";

import { generateRandomColor } from "./modules/color-generator.js";

import { updatePalette } from "./modules/palette-ui.js";

import { copyToClipboard } from "./modules/clipboard.js";

import { showToast } from "./modules/toast.js";

import { elements } from "./modules/dom.js";

import {
  addToHistory,
  clearHistory,
  renderHistory,
  getHistoryColor,
} from "./modules/color-history.js";

import {
  loadHistory,
  saveHistory,
  loadFavorites,
  saveFavorites,
} from "./modules/storage.js";

import {
  generateComplementaryPalette,
  generateMonochromaticPalette,
  generateAnalogousPalette,
  generateShades,
} from "./modules/palette-generator.js";

import {
  addFavorite,
  removeFavorite,
  isFavorite,
  renderFavorites,
  clearFavorites,
  updateFavoriteButton,
  getFavoriteColor,
} from "./modules/favorites.js";

import {
  updateColorUI,
  getCurrentColorValue,
  updateColorValue,
} from "./modules/color-ui.js";

import { checkWCAG, getContrastRatio } from "./modules/contrast.js";
import { hexToRgb, rgbToHex } from "./modules/color-converter.js";
import { updateContrastUI } from "./modules/contrast-ui.js";

const colorUI = {
  colorDisplay: elements.colorDisplay,
  colorValue: elements.colorValue,
  channelValues: elements.channelValues,
  channelProgress: elements.channelProgress,
};

const paletteUI = {
  colors: elements.paletteColors,
  swatches: elements.paletteSwatches,
  codes: elements.paletteCodes,
};

const paletteGenerators = {
  monochromatic: generateMonochromaticPalette,
  complementary: generateComplementaryPalette,
  analogous: generateAnalogousPalette,
  shades: generateShades,
};

function updateUI() {
  updateColorUI(colorUI, state.currentColor, state.currentFormat);
  updateFavoriteButton(
    elements.favoriteButton,
    state.favoriteColors,
    state.currentColor,
  );
}

function handleGenerateColor() {
  state.currentColor = generateRandomColor();

  addToHistory(state.colorHistory, state.currentColor, state.maxHistory);
  saveHistory(state.colorHistory);

  updateUI();
  renderHistory(state.colorHistory, elements.historyList);
  handleGeneratePalette();
}

async function copyColor() {
  const color = getCurrentColorValue(state.currentColor, state.currentFormat);

  const copied = await copyToClipboard(color);

  if (!copied) return;

  showToast(elements.toast, "Color copied to clipboard");

  elements.copyMessage.textContent = "Copied!";

  setTimeout(() => {
    elements.copyMessage.textContent = "Click to copy code";
  }, 1500);
}

async function copyPaletteColor(event) {
  const button = event.target.closest(".palette-generator__color");

  if (!button) return;

  const color = button.dataset.color;

  const copied = await copyToClipboard(color);

  if (!copied) return;

  showToast(elements.toast, "Color copied to clipboard");
}

function setActiveFormat(selectedButton) {
  elements.formatButtons.forEach((button) => {
    button.classList.remove("color-generator__format--active");
  });

  selectedButton.classList.add("color-generator__format--active");
}

elements.formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.currentFormat = button.dataset.format;

    setActiveFormat(button);
    updateColorValue(
      elements.colorValue,
      state.currentColor,
      state.currentFormat,
    );
  });
});

function handleClearHistory() {
  clearHistory(state.colorHistory);
  saveHistory(state.colorHistory);
  renderHistory(state.colorHistory, elements.historyList);
}

function handleHistorySelection(event) {
  const color = getHistoryColor(event);

  if (!color) return;

  state.currentColor = color;

  updateUI();
  handleGeneratePalette();
}

function handleGeneratePalette() {
  const type = elements.paletteType.value;
  const generator = paletteGenerators[type];

  if (!generator) return;

  const palette = generator(state.currentColor);

  updatePalette(paletteUI, palette);
}

function handleToggleFavorite() {
  if (isFavorite(state.favoriteColors, state.currentColor)) {
    removeFavorite(state.favoriteColors, state.currentColor);
  } else {
    const added = addFavorite(
      state.favoriteColors,
      state.currentColor,
      state.maxFavorites,
    );

    if (!added) {
      showFavoriteLimitMessage();
      return;
    }
  }

  saveFavorites(state.favoriteColors);
  updateFavoriteButton(
    elements.favoriteButton,
    state.favoriteColors,
    state.currentColor,
  );
  renderFavorites(state.favoriteColors, elements.favoritesList);
}

function handleFavoriteSelection(event) {
  const color = getFavoriteColor(event);

  if (!color) return;

  state.currentColor = color;

  updateUI();
  handleGeneratePalette();
}

function handleClearFavorites() {
  clearFavorites(state.favoriteColors);
  saveFavorites(state.favoriteColors);
  renderFavorites(state.favoriteColors, elements.favoritesList);
}

function showFavoriteLimitMessage() {
  showToast(
    elements.toast,
    `Maximum of ${state.maxFavorites} favorite colors reached.`,
  );
}

function updateContrast() {
  const foreground = elements.foregroundInput.value;
  const background = elements.backgroundInput.value;

  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);

  const ratio = getContrastRatio(foregroundRgb, backgroundRgb);

  const wcag = checkWCAG(ratio);

  updateContrastUI(elements, foreground, background, ratio, wcag);
}

function handleUseCurrentColor() {
  const color = rgbToHex(state.currentColor);

  elements.foregroundInput.value = color;

  updateContrast();
}

function handleSwapContrastColors() {
  const foreground = elements.foregroundInput.value;
  const background = elements.backgroundInput.value;

  elements.foregroundInput.value = background;
  elements.backgroundInput.value = foreground;

  updateContrast();
}

function initilizeApp() {
  state.colorHistory.push(...loadHistory());
  state.favoriteColors.push(...loadFavorites());

  updateUI();
  renderHistory(state.colorHistory, elements.historyList);
  renderFavorites(state.favoriteColors, elements.favoritesList);
  handleGeneratePalette();
}

elements.historyClear.addEventListener("click", handleClearHistory);

elements.historyList.addEventListener("click", handleHistorySelection);

elements.generateButton.addEventListener("click", handleGenerateColor);

elements.copyButton.addEventListener("click", copyColor);

elements.paletteGenerateButton.addEventListener("click", handleGeneratePalette);

elements.paletteType.addEventListener("change", handleGeneratePalette);

elements.paletteColorsContainer.addEventListener("click", copyPaletteColor);

elements.favoriteButton.addEventListener("click", handleToggleFavorite);

elements.favoritesClear.addEventListener("click", handleClearFavorites);

elements.favoritesList.addEventListener("click", handleFavoriteSelection);

elements.foregroundInput.addEventListener("input", updateContrast);

elements.backgroundInput.addEventListener("input", updateContrast);

elements.contrastUseCurrent.addEventListener("click", handleUseCurrentColor);

elements.contrastSwap.addEventListener("click", handleSwapContrastColors);

initilizeApp();
