export function updateContrastUI(
  elements,
  foreground,
  background,
  ratio,
  wcag,
) {
  elements.contrastForegroundValue.textContent = foreground.toUpperCase();
  elements.contrastBackgroundValue.textContent = background.toUpperCase();

  elements.contrastPreview.style.backgroundColor = background;

  elements.contrastPreviewLarge.style.color = foreground;
  elements.contrastPreviewNormal.style.color = foreground;

  elements.contrastRatio.textContent = `${ratio.toFixed(2)}:1`;

  const results = [wcag.aaNormal, wcag.aaLarge, wcag.aaaNormal, wcag.aaaLarge];

  elements.criteria.forEach((element, index) => {
    element.textContent = results[index] ? "Pass" : "Fail";

    element.classList.toggle(
      "contrast-checker__criterion-status--pass",
      results[index],
    );

    element.classList.toggle(
      "contrast-checker__criterion-status--fail",
      !results[index],
    );
  });
}
