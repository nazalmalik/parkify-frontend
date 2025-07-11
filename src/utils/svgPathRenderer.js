const svgPathRenderer = (
  svgRoot,
  pathData,
  coordinates,
  vehicleType = 'car',
  destinationNode = ''
) => {
  if (!svgRoot) return;

  // Clean up old elements
  ['#nav-path', '#start-icon', '#end-icon', '#moving-vehicle'].forEach((id) => {
    const el = svgRoot.querySelector(id);
    if (el) el.remove();
  });

  // Draw the path
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('id', 'nav-path');
  path.setAttribute('d', pathData);
  path.setAttribute('stroke', 'blue');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('fill', 'none');
  svgRoot.appendChild(path);

  if (coordinates && coordinates.length >= 2) {
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];

    // Start point (green)
    const startCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    startCircle.setAttribute('id', 'start-icon');
    startCircle.setAttribute('cx', start.x);
    startCircle.setAttribute('cy', start.y);
    startCircle.setAttribute('r', 6);
    startCircle.setAttribute('fill', 'green');
    svgRoot.appendChild(startCircle);

    // End point (gray, turns red on arrival)
    const endCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    endCircle.setAttribute('id', 'end-icon');
    endCircle.setAttribute('cx', end.x);
    endCircle.setAttribute('cy', end.y);
    endCircle.setAttribute('r', 6);
    endCircle.setAttribute('fill', '#999');
    svgRoot.appendChild(endCircle);

    // Vehicle icon
    const iconSize = 50;
    const vehicleImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    vehicleImage.setAttribute('id', 'moving-vehicle');

    const iconUrl =
      vehicleType.toLowerCase() === 'bike'
        ? 'https://cdn-icons-png.flaticon.com/512/9983/9983137.png'
        : 'https://cdn-icons-png.flaticon.com/512/727/727606.png';

    vehicleImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', iconUrl);
    vehicleImage.setAttribute('width', iconSize);
    vehicleImage.setAttribute('height', iconSize);
    vehicleImage.setAttribute('x', -100);
    vehicleImage.setAttribute('y', -100);
    vehicleImage.setAttribute('style', 'image-rendering: crisp-edges;');
    svgRoot.appendChild(vehicleImage);

    // Animate along the coordinates
    let i = 0;
    const animate = () => {
      if (i >= coordinates.length) {
        endCircle.setAttribute('fill', 'red');
        return;
      }

      const { x, y } = coordinates[i];
      vehicleImage.setAttribute('x', x - iconSize / 2);
      vehicleImage.setAttribute('y', y - iconSize / 2);
      i++;

      setTimeout(animate, 800); // 300ms per step
    };

    animate();
  }
};

export default svgPathRenderer;
