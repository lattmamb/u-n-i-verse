import type { Map } from 'mapbox-gl';

export const initializeMapEffects = (map: Map) => {
  // Add atmosphere and fog effects
  map.setFog({
    'horizon-blend': 0.3,
    'star-intensity': 0.15,
    'space-color': '#000000',
    'color': '#242B4B'
  });

  // Add atmosphere effect
  map.setFog({
    'color': 'rgb(186, 210, 235)',
    'high-color': 'rgb(36, 92, 223)',
    'horizon-blend': 0.02,
    'space-color': 'rgb(11, 11, 25)',
    'star-intensity': 0.6
  });

  // Add 3D terrain
  map.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.terrain-rgb',
    'tileSize': 512,
    'maxzoom': 14
  });

  map.setTerrain({
    'source': 'mapbox-dem',
    'exaggeration': 1.5
  });

  // Add 3D buildings
  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-base': ['get', 'min_height'],
      'fill-extrusion-opacity': 0.8
    }
  });
};