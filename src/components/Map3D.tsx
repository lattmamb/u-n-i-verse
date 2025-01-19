import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { MapIcon, Compass, ZoomIn, ZoomOut, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        projection: is3DMode ? 'globe' : 'mercator',
        fog: {
          'horizon-blend': 0.3,
          'star-intensity': 0.15,
          'space-color': '#000000',
          'color': '#242B4B'
        }
      });

      map.current.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
      }));

      map.current.on('style.load', () => {
        if (!map.current) return;

        // Add atmosphere effect
        map.current.setFog({
          'color': 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });

        // Add 3D terrain
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.terrain-rgb',
          'tileSize': 512,
          'maxzoom': 14
        });

        map.current.setTerrain({
          'source': 'mapbox-dem',
          'exaggeration': 1.5
        });

        // Add 3D buildings
        map.current.addLayer({
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

      // Add automatic rotation for immersive effect
      const rotateCamera = () => {
        if (!map.current || !isMapActive) return;
        setRotation(prev => prev + 0.5);
        map.current.easeTo({
          bearing: rotation,
          duration: 50,
          easing: t => t
        });
        requestAnimationFrame(rotateCamera);
      };

      if (isMapActive) {
        requestAnimationFrame(rotateCamera);
      }

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [userLocation, isMapActive, rotation, is3DMode]);

  const handleMapToggle = () => {
    setIsMapActive(!isMapActive);
  };

  const toggle3DMode = () => {
    setIs3DMode(!is3DMode);
    if (map.current) {
      map.current.setProjection(is3DMode ? 'mercator' : 'globe');
    }
  };

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

      <AnimatePresence>
        {isMapActive && (
          <motion.div 
            className="fixed bottom-20 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Button
              onClick={() => map.current?.zoomIn()}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              size="icon"
            >
              <ZoomIn className="h-4 w-4 text-white" />
            </Button>
            <Button
              onClick={() => map.current?.zoomOut()}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              size="icon"
            >
              <ZoomOut className="h-4 w-4 text-white" />
            </Button>
            <Button
              onClick={() => map.current?.resetNorth()}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              size="icon"
            >
              <Compass className="h-4 w-4 text-white" />
            </Button>
            <Button
              onClick={toggle3DMode}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              size="icon"
            >
              <Globe2 className="h-4 w-4 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={handleMapToggle}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
          size="icon"
        >
          <MapIcon className={`h-4 w-4 text-white transition-transform duration-300 ${isMapActive ? 'rotate-180' : ''}`} />
        </Button>
      </motion.div>
    </>
  );
};

export default Map3D;