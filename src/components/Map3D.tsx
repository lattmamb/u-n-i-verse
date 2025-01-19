import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
}

const Map3D: React.FC<MapProps> = ({ userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdHlmbGVldCIsImEiOiJjbTV0bjBuMnEweWV2MmxxNjY3NWk5OGhlIn0.fVzbEBvxSWr1yt7iU1Uj0w';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [userLocation.lng, userLocation.lat],
        zoom: 8,
        pitch: 45,
        bearing: -17.6,
        antialias: true,
        interactive: false
      });

      map.current.addControl(new mapboxgl.NavigationControl());

      new mapboxgl.Marker({ color: '#00ff00' })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current);

      new mapboxgl.Marker({ color: '#0FA0CE', rotation: 45 })
        .setLngLat([-88.9548, 39.8403] as [number, number])
        .addTo(map.current);

      const mockLocations: [number, number][] = [
        [-88.2434, 40.1164],
        [-89.6501, 39.7817],
        [-88.0834, 42.0334]
      ];

      mockLocations.forEach(location => {
        new mapboxgl.Marker({ color: '#ff0000' })
          .setLngLat(location)
          .addTo(map.current);
      });

      map.current.on('style.load', () => {
        if (!map.current) return;

        map.current.addLayer({
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

        map.current.setLayoutProperty('3d-buildings', 'visibility', isMapActive ? 'visible' : 'none');
        
        if (isMapActive) {
          map.current.dragPan.enable();
          map.current.scrollZoom.enable();
          map.current.dragRotate.enable();
          map.current.touchZoomRotate.enable();
        } else {
          map.current.dragPan.disable();
          map.current.scrollZoom.disable();
          map.current.dragRotate.disable();
          map.current.touchZoomRotate.disable();
        }

        setIsMapInitialized(true);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [userLocation, isMapActive]);

  useEffect(() => {
    if (map.current && isMapInitialized) {
      map.current.setLayoutProperty('3d-buildings', 'visibility', isMapActive ? 'visible' : 'none');
      
      if (isMapActive) {
        map.current.dragPan.enable();
        map.current.scrollZoom.enable();
        map.current.dragRotate.enable();
        map.current.touchZoomRotate.enable();
      } else {
        map.current.dragPan.disable();
        map.current.scrollZoom.disable();
        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disable();
      }
    }
  }, [isMapActive, isMapInitialized]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <>
      <div className={`absolute inset-0 -z-10 transition-opacity duration-500 ${isMapActive ? 'opacity-100' : 'opacity-30'}`}>
        <div ref={mapContainer} className="w-full h-full" />
        <div className={`absolute inset-0 bg-black/30 pointer-events-none ${isMapActive ? 'bg-opacity-0' : 'bg-opacity-70'}`} />
      </div>
      <Button
        onClick={() => setIsMapActive(!isMapActive)}
        className="fixed bottom-4 right-4 z-50"
        variant="secondary"
        size="icon"
      >
        <MapIcon className={`h-4 w-4 transition-transform ${isMapActive ? 'rotate-180' : ''}`} />
      </Button>
    </>
  );
};

export default Map3D;