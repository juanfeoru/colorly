import { rgbToHex } from "./color-converter.js";

export function addToHistory(history, color, maxHistory) {
  history.unshift({
    color: { ...color },
    createdAt: new Date(),
  });

  if (history.length > maxHistory) {
    history.pop();
  }
}

export function clearHistory(history) {
  history.length = 0;
}

function createHistoryItem(item) {
  const hex = rgbToHex(item.color);

  const button = document.createElement("button");
  button.classList.add("color-card", "color-history__item");
  button.type = "button";
  button.dataset.color = JSON.stringify(item.color);

  const swatch = document.createElement("div");
  swatch.classList.add("color-card__swatch");
  swatch.style.backgroundColor = hex;
  swatch.setAttribute("aria-hidden", "true");

  const info = document.createElement("div");
  info.classList.add("color-card__info");

  const code = document.createElement("span");
  code.classList.add("color-card__code");
  code.textContent = hex.toUpperCase();

  const time = document.createElement("span");
  time.classList.add("color-card__time");
  time.textContent = item.createdAt.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  info.append(code, time);
  button.append(swatch, info);

  return button;
}

export function renderHistory(history, historyList) {
  historyList.replaceChildren();

  history.forEach((item) => {
    historyList.append(createHistoryItem(item));
  });
}
