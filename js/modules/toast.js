export function showToast(element, message) {
  element.textContent = message;
  element.classList.add("toast--visible");

  setTimeout(() => {
    element.classList.remove("toast--visible");
  }, 1500);
}
