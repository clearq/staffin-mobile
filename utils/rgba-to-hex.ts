export const rgbaToHex = (hexCode: string, opacity: number) => {

  
  // Ensure opacity is in the valid range [0, 1]
  opacity = Math.max(0, Math.min(1, opacity));

  // Remove any '#' from the hex code if it's present
  hexCode = hexCode?.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hexCode?.slice(0, 2), 16);
  const g = parseInt(hexCode?.slice(2, 4), 16);
  const b = parseInt(hexCode?.slice(4, 6), 16);

  // Convert RGB to RGBA with the given opacity
  const rgba = `RGBA(${r},${g},${b},${opacity})`;

  return rgba;
};

export function hexToRgba(hex : string, opacity: number) {
  // Remove the leading '#' if present
  hex = hex?.replace("#", "");

  // Parse the hex string to get the RGB values
  const r = parseInt(hex?.substring(0, 2), 16);
  const g = parseInt(hex?.substring(2, 4), 16);
  const b = parseInt(hex?.substring(4, 6), 16);

  // Convert the RGB values to rgba format with the specified opacity
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}