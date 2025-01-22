import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export const VerseHeader = () => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl font-bold text-white">
        You and I <span className="text-primary">Verse</span>
      </h1>
      <p className="text-lg text-gray-200">
        Connect with your world, on the go
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
        <MapPin className="w-4 h-4" />
        <span>Decatur, Illinois</span>
      </div>
    </motion.div>
  );
};