import { Home, MapPin, Plus, Calendar, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export const MainNavigation = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4"
    >
      <div className="flex justify-around items-center max-w-screen-sm mx-auto">
        <NavButton icon={<Home className="w-6 h-6" />} label="Home" />
        <NavButton icon={<MapPin className="w-6 h-6" />} label="Map" />
        <CreateButton />
        <NavButton icon={<Calendar className="w-6 h-6" />} label="Schedule" />
        <NavButton icon={<Navigation className="w-6 h-6" />} label="Navigate" />
      </div>
    </motion.div>
  );
};

const NavButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <motion.button 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="text-white/60 hover:text-white flex flex-col items-center gap-1"
  >
    {icon}
    <span className="text-xs">{label}</span>
  </motion.button>
);

const CreateButton = () => (
  <motion.button 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-purple-500 rounded-full p-4 -mt-8 text-white shadow-lg hover:bg-purple-600 transition-colors"
  >
    <Plus className="w-6 h-6" />
    <span className="text-xs font-semibold mt-1">Create</span>
  </motion.button>
);