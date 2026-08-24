import { rgbToHsl, hslToRgb } from "./color-converter.js";

export function generateMonochromaticPalette(color) {
  const hsl = rgbToHsl(color);
  const lightnessValues = [20, 35, 50, 65, 80];

  const palette = lightnessValues.map((lightness) => {
    const newHsl = {
      h: hsl.h,
      s: hsl.s,
      l: lightness,
    };

    return hslToRgb(newHsl);
  });

  return palette;
}
