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

export function generateAnalogousPalette(color) {
  const hsl = rgbToHsl(color);

  const hues = [hsl.h - 60, hsl.h - 30, hsl.h, hsl.h + 30, hsl.h + 60];

  const colors = hues.map((hue) => {
    return {
      h: (hue + 360) % 360,
      s: hsl.s,
      l: hsl.l,
    };
  });

  return colors.map((color) => {
    return hslToRgb(color);
  });
}

export function generateShades(color) {
  const shades = [];

  const lighten = [0.2, 0.4];
  const darken = [0.2, 0.4];

  lighten.forEach((amount) => {
    shades.push({
      r: Math.round(color.r + (255 - color.r) * amount),
      g: Math.round(color.g + (255 - color.g) * amount),
      b: Math.round(color.b + (255 - color.b) * amount),
    });
  });

  shades.push({ ...color });

  darken.forEach((amount) => {
    shades.push({
      r: Math.round(color.r * (1 - amount)),
      g: Math.round(color.g * (1 - amount)),
      b: Math.round(color.b * (1 - amount)),
    });
  });

  return shades;
}
