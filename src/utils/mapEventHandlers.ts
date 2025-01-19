import type { Map } from 'mapbox-gl';

export const setupMapEventHandlers = (
  map: Map,
  isMapActive: boolean,
  setRotation: (fn: (prev: number) => number) => void
) => {
  let userInteracting = false;

  // Rotation animation
  const rotateCamera = () => {
    if (!map || !isMapActive) return;
    setRotation(prev => prev + 0.5);
    map.easeTo({
      bearing: map.getBearing() + 0.5,
      duration: 50,
      easing: t => t
    });
    requestAnimationFrame(rotateCamera);
  };

  // Event listeners
  map.on('mousedown', () => {
    userInteracting = true;
  });

  map.on('dragstart', () => {
    userInteracting = true;
  });

  map.on('mouseup', () => {
    userInteracting = false;
    if (isMapActive) rotateCamera();
  });

  map.on('touchend', () => {
    userInteracting = false;
    if (isMapActive) rotateCamera();
  });

  // Start rotation if map is active
  if (isMapActive) {
    rotateCamera();
  }

  return rotateCamera;
};