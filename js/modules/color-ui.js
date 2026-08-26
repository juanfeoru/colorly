import {
  rgbToHex,
  rgbToHsl,
  rgbToString,
  hslToString,
} from "./color-converter.js";

const formatters = {
  hex: rgbToHex,
  rgb: rgbToString,
  hsl: (color) => hslToString(rgbToHsl(color)),
};

export function updateColorUI(elements, color, format) {
  elements.colorDisplay.style.background = rgbToHex(color);

  updateColorValue(elements.colorValue, color, format);

  updateRgbChannels(elements.channelValues, elements.channelProgress, color);
}

export function updateColorValue(element, color, format) {
  element.textContent = getCurrentColorValue(color, format);
}

export function getCurrentColorValue(color, format) {
  const formatter = formatters[format];

  return formatter(color);
}

function updateRgbChannels(channelValues, channelProgress, color) {
  const channels = {
    red: color.r,
    green: color.g,
    blue: color.b,
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
