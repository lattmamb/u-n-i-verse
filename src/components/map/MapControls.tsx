import React from 'react';
import { Button } from "@/components/ui/button";
import { MapIcon, Compass, ZoomIn, ZoomOut, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Map } from 'mapbox-gl';

interface MapControlsProps {
  map: Map | null;
  isMapActive: boolean;
  setIsMapActive: (active: boolean) => void;
  is3DMode: boolean;
  setIs3DMode: (mode: boolean) => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  map,
  isMapActive,
  setIsMapActive,
  is3DMode,
  setIs3DMode
}) => {
  const handleMapToggle = () => {
    setIsMapActive(!isMapActive);
  };

  const toggle3DMode = () => {
    setIs3DMode(!is3DMode);
    if (map) {
      map.setProjection(is3DMode ? 'mercator' : 'globe');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMapActive && (
          <motion.div 
            className="fixed bottom-20 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Button
              onClick={() => map?.zoomIn()}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              size="icon"
            >
              <ZoomIn className="h-4 w-4 text-white" />
            </Button>
            <Button
              onClick={() => map?.zoomOut()}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              size="icon"
            >
              <ZoomOut className="h-4 w-4 text-white" />
            </Button>
            <Button
              onClick={() => map?.resetNorth()}
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