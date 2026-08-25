const HISTORY_KEY = "colorly-history";
const FAVORITES_KEY = "colorly-favorites";

export function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function loadHistory() {
  const history = localStorage.getItem(HISTORY_KEY);

  if (!history) {
    return [];
  }

  return JSON.parse(history).map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function loadFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  if (!favorites) {
    return [];
  }

  return JSON.parse(favorites);
}
