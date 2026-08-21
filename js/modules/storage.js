const HISTORY_KEY = "colorly-history";

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
