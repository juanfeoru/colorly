export const elements = {
  generateButton: document.querySelector(".color-generator__generate"),
  colorDisplay: document.querySelector(".color-generator__swatch"),
  colorValue: document.querySelector(".color-generator__hex"),

  formatButtons: document.querySelectorAll(".color-generator__format"),

  historyList: document.getElementById("color-history__list"),
  historyClear: document.getElementById("color-history__clear"),

  favoritesClear: document.getElementById("color-favorites__clear"),
  favoritesList: document.getElementById("color-favorites__list"),
  favoriteButton: document.querySelector(".color-generator__favorite"),

  copyButton: document.querySelector(".color-generator__copy"),
  copyMessage: document.querySelector(".color-generator__hint"),
  toast: document.querySelector(".toast"),

  channelValues: document.querySelectorAll(".color-generator__channel-value"),

  channelProgress: document.querySelectorAll(
    ".color-generator__channel-progress",
  ),

  paletteSwatches: document.querySelectorAll(".palette-generator__swatch"),

  paletteCodes: document.querySelectorAll(".palette-generator__value"),

  paletteColors: document.querySelectorAll(".palette-generator__color"),

  paletteColorsContainer: document.querySelector(".palette-generator__colors"),

  paletteGenerateButton: document.querySelector(".palette-generator__generate"),

  paletteType: document.getElementById("palette-type"),

  foregroundInput: document.getElementById("contrast-foreground"),
  backgroundInput: document.getElementById("contrast-background"),

  contrastUseCurrent: document.querySelector(".contrast-checker__use-current"),

  contrastSwap: document.querySelector(".contrast-checker__swap"),

  contrastForegroundValue: document.getElementById("contrast-foreground-value"),

  contrastBackgroundValue: document.getElementById("contrast-background-value"),

  contrastPreview: document.querySelector(".contrast-checker__preview-box"),

  contrastPreviewLarge: document.querySelector(
    ".contrast-checker__preview-large",
  ),

  contrastPreviewNormal: document.querySelector(
    ".contrast-checker__preview-normal",
  ),

  contrastRatio: document.querySelector(".contrast-checker__ratio"),

  contrastCriteria: document.querySelectorAll(
    ".contrast-checker__criterion-status",
  ),

  criteria: document.querySelectorAll(".contrast-checker__criterion-status"),
};
