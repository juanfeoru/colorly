export async function copyToClipboard(color) {
  try {
    await navigator.clipboard.writeText(color);

    return true;
  } catch (error) {
    console.error("Failed to copy color:", color);

    return false;
  }
}
