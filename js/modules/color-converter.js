export function rgbToHex(color) {
  const red = color.r.toString(16).padStart(2, "0");
  const green = color.g.toString(16).padStart(2, "0");
  const blue = color.b.toString(16).padStart(2, "0");

  return `#${red}${green}${blue}`.toUpperCase();
}

export function rgbToHsl(color) {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
  }

  h /= 6;
  h = (h + 1) % 1;

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function rgbToString(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function hslToString(color) {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}
