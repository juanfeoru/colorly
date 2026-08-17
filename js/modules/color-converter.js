export function rgbToHex(color) {
  const red = color.r.toString(16).padStart(2, "0");
  const green = color.g.toString(16).padStart(2, "0");
  const blue = color.b.toString(16).padStart(2, "0");

  return `#${red}${green}${blue}`.toUpperCase();
}
