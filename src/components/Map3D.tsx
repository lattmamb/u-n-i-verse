import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from "framer-motion";
import { MapControls } from './map/MapControls';
import { initializeMapEffects } from '@/utils/mapEffects';
import { setupMapEventHandlers } from '@/utils/mapEventHandlers';

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
}

const Map3D: React.FC<MapProps> = ({ userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdHlmbGVldCIsImEiOiJjbTV0bjBuMnEweWV2MmxxNjY3NWk5OGhlIn0.fVzbEBvxSWr1yt7iU1Uj0w';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [userLocation.lng, userLocation.lat],
        zoom: 15,
        pitch: 75,
        bearing: 0,
        antialias: true,
        projection: is3DMode ? 'globe' : 'mercator'
      });

      map.current.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
      }));

      map.current.on('style.load', () => {
        if (!map.current) return;

        initializeMapEffects(map.current);

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

      const rotateCamera = setupMapEventHandlers(map.current, isMapActive, setRotation);

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [userLocation, isMapActive, rotation, is3DMode]);

  return (
    <>
      <motion.div 
        className={`absolute inset-0 -z-10 transition-all duration-500`}
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: isMapActive ? 1 : 0.3,
          scale: isMapActive ? 1 : 0.95
        }}
        transition={{ duration: 0.5 }}
      >
        <div ref={mapContainer} className="w-full h-full" />
        <div className={`absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-500 ${isMapActive ? 'opacity-0' : 'opacity-70'}`} />
      </motion.div>

      <MapControls
        map={map.current}
        isMapActive={isMapActive}
        setIsMapActive={setIsMapActive}
        is3DMode={is3DMode}
        setIs3DMode={setIs3DMode}
      />
    </>
  );
};

export default Map3D;