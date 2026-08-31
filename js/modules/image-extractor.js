export function getImagePixels(image) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, canvas.width, canvas.height);
}

function quantize(value, step = 32) {
  return Math.min(Math.round(value / step) * step, 255);
}

export function extractColors(imageData, colorCount = 5) {
  const colorMap = new Map();
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = quantize(data[i]);
    const g = quantize(data[i + 1]);
    const b = quantize(data[i + 2]);
    const a = data[i + 3];

    if (a === 0) continue;

    const color = `${r},${g},${b}`;

    colorMap.set(color, (colorMap.get(color) || 0) + 1);
  }

  const colors = [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount)
    .map(([color]) => {
      const [r, g, b] = color.split(",").map(Number);

      return { r, g, b };
    });

  return colors;
}
