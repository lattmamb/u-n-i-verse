import { motion } from "framer-motion";
import { MAP_STYLES } from '@/utils/mapConfig';

interface MapOverlayProps {
  isMapActive: boolean;
}

export const MapOverlay = ({ isMapActive }: MapOverlayProps) => (
  <div className={`absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-500 ${
    isMapActive ? MAP_STYLES.overlayActive : MAP_STYLES.overlayInactive
  }`} />
);

export const MapWrapper = ({ children, isMapActive }: { children: React.ReactNode; isMapActive: boolean }) => (
  <motion.div 
    className="absolute inset-0 -z-10 transition-all duration-500"
    initial={{ opacity: 0.3 }}
    animate={{ 
      opacity: isMapActive ? 1 : 0.3,
      scale: isMapActive ? 1 : 0.95
    }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);