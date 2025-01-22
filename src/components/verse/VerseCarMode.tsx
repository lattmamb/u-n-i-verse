import { motion, AnimatePresence } from "framer-motion";
import { Car, Link2, Smartphone } from "lucide-react";

interface VerseCarModeProps {
  isCarMode: boolean;
}

export const VerseCarMode = ({ isCarMode }: VerseCarModeProps) => {
  return (
    <AnimatePresence>
      {isCarMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md p-4 rounded-lg flex items-center gap-3 z-50"
        >
          <Smartphone className="h-5 w-5 text-primary" />
          <span className="text-sm text-white">Tap your phone to connect</span>
          <Link2 className="h-5 w-5 text-primary animate-pulse" />
          <Car className="h-5 w-5 text-primary" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};