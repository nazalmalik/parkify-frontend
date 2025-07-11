// utils/svgHelpers.js

/**
 * Converts an array of coordinate objects into an SVG path string.
 * 
 * Example input:
 * [
 *   { x: 100, y: 730 },
 *   { x: 1030, y: 100 }
 * ]
 * 
 * Output:
 * "M100 730 L1030 100"
 */
export function coordinatesToPathD(coordinates) {
  if (!coordinates || coordinates.length === 0) return '';

  return coordinates
    .map((point, index) => {
      const cmd = index === 0 ? 'M' : 'L';
      return `${cmd}${point.x} ${point.y}`;
    })
    .join(' ');
}
