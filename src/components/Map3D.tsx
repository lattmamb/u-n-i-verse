import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
}

const Map3D: React.FC<MapProps> = ({ userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [userLocation.lng, userLocation.lat],
      zoom: 8,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add user location marker (green)
    new mapboxgl.Marker({ color: '#00ff00' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

    // Add Decatur, IL marker (blue arrow)
    new mapboxgl.Marker({ color: '#0FA0CE', rotation: 45 })
      .setLngLat([-88.9548, 39.8403] as [number, number]) // Decatur, IL coordinates
      .addTo(map.current);

    // Mock other users' locations (red dots)
    const mockLocations: [number, number][] = [
      [-88.2434, 40.1164], // Champaign
      [-89.6501, 39.7817], // Springfield
      [-88.0834, 42.0334]  // Chicago
    ];

    mockLocations.forEach(location => {
      new mapboxgl.Marker({ color: '#ff0000' })
        .setLngLat(location)
        .addTo(map.current);
    });

    // Add 3D building layer
    map.current.on('style.load', () => {
      map.current?.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#222',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

    return () => map.current?.remove();
  }, [userLocation]);

  return (
    <div className="absolute inset-0 -z-10">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay to ensure content readability */}
    </div>
  );
};

export default Map3D;