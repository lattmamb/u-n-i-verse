import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
}

const Map3D: React.FC<MapProps> = ({ userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !userLocation || !mapboxToken) return;

    try {
      // Initialize map
      mapboxgl.accessToken = mapboxToken;
      
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
        .setLngLat([-88.9548, 39.8403] as [number, number])
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

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!isMapInitialized) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80">
        <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold text-foreground">Enter Mapbox Token</h2>
          <p className="text-sm text-muted-foreground">
            Please enter your Mapbox public token to initialize the map. 
            You can find this in your Mapbox account dashboard.
          </p>
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button 
            onClick={initializeMap}
            disabled={!mapboxToken || !userLocation}
          >
            Initialize Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default Map3D;