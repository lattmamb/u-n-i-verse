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

  // Illinois coordinates
  const illinoisCoordinates = {
    lat: 40.6331,
    lng: -89.3985
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdHlmbGVldCIsImEiOiJjbTV0bjBuMnEweWV2MmxxNjY3NWk5OGhlIn0.fVzbEBvxSWr1yt7iU1Uj0w';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [userLocation?.lng || illinoisCoordinates.lng, userLocation?.lat || illinoisCoordinates.lat],
        zoom: 5,
        pitch: 60,
        bearing: 0,
        antialias: true,
        projection: is3DMode ? 'globe' : 'mercator'
      });

      // Add Illinois marker
      new mapboxgl.Marker()
        .setLngLat([illinoisCoordinates.lng, illinoisCoordinates.lat])
        .addTo(map.current);

      map.current.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
      }));

      map.current.on('style.load', () => {
        if (!map.current) return;

        initializeMapEffects(map.current);

        // Add a simple polygon for Illinois instead of using boundaries dataset
        map.current.addSource('illinois-outline', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[
                [-91.513079, 40.634033],
                [-90.639984, 41.528796],
                [-87.802482, 41.759445],
                [-87.523661, 41.759445],
                [-87.523661, 38.742481],
                [-88.071564, 37.937757],
                [-89.167427, 37.038997],
                [-89.705036, 37.038997],
                [-91.513079, 40.634033]
              ]]
            }
          }
        });

        map.current.addLayer({
          'id': 'illinois-outline',
          'type': 'line',
          'source': 'illinois-outline',
          'layout': {},
          'paint': {
            'line-color': '#627BC1',
            'line-width': 2,
            'line-opacity': 0.7
          }
        });

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