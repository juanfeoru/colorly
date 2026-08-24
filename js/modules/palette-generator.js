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

export function generateComplementaryPalette(color) {
  const hsl = rgbToHsl(color);

  const complementaryHue = (hsl.h + 180) % 360;

  const colors = [
    {
      h: hsl.h,
      s: hsl.s,
      l: Math.max(hsl.l - 15, 10),
    },
    {
      h: hsl.h,
      s: hsl.s,
      l: hsl.l,
    },
    {
      h: complementaryHue,
      s: hsl.s,
      l: hsl.l,
    },
    {
      h: complementaryHue,
      s: hsl.s,
      l: Math.min(hsl.l + 15, 90),
    },
    {
      h: complementaryHue,
      s: hsl.s,
      l: Math.min(hsl.l + 30, 95),
    },
  ];

  return colors.map(hslToRgb);
}
