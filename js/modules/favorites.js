import { rgbToHex } from "./color-converter.js";

export function addFavorite(favorites, color, maxFavorites) {
  if (favorites.length >= maxFavorites) return false;

  favorites.push({ ...color });

  return true;
}

export function removeFavorite(favorites, color) {
  const index = favorites.findIndex(
    (favorite) =>
      favorite.r === color.r &&
      favorite.g === color.g &&
      favorite.b === color.b,
  );

  if (index !== -1) {
    favorites.splice(index, 1);
  }
}

export function isFavorite(favorites, color) {
  return favorites.some(
    (favorite) =>
      favorite.r === color.r &&
      favorite.g === color.g &&
      favorite.b === color.b,
  );
}

function createFavoriteItem(color) {
  const hex = rgbToHex(color);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("color-card", "color-favorites__item");

  button.dataset.color = JSON.stringify(color);

  const swatch = document.createElement("span");
  swatch.classList.add("color-card__swatch");
  swatch.style.backgroundColor = hex;
  swatch.setAttribute("aria-hidden", "true");

  const info = document.createElement("span");
  info.classList.add("color-card__info");

  const value = document.createElement("span");
  value.classList.add("color-card__code");
  value.textContent = hex.toUpperCase();

  info.append(value);
  button.append(swatch, info);

  return button;
}

export function renderFavorites(favorites, favoritesList) {
  favoritesList.replaceChildren();

  favorites.forEach((color) => {
    favoritesList.append(createFavoriteItem(color));
  });
}

export function clearFavorites(favorites) {
  favorites.length = 0;
}
