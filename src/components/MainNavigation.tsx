import { Camera, Map, MessageCircle, Ghost, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const MainNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (route: string, label: string) => {
    toast({
      title: `Opening ${label}`,
      description: "Loading content...",
    });
    navigate(route);
  };

  const handleCreate = () => {
    toast({
      title: "New Snap",
      description: "Opening camera...",
    });
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-snap-black to-transparent p-4"
    >
      <div className="flex justify-around items-center max-w-screen-sm mx-auto">
        <NavButton 
          icon={<Map className="w-6 h-6" />} 
          label="Map" 
          onClick={() => handleNavigation("/", "Map")}
        />
        <NavButton 
          icon={<MessageCircle className="w-6 h-6" />} 
          label="Chat" 
          onClick={() => handleNavigation("/verse", "Chat")}
        />
        <CreateButton onClick={handleCreate} />
        <NavButton 
          icon={<Camera className="w-6 h-6" />} 
          label="Camera" 
          onClick={() => handleNavigation("/u", "Camera")}
        />
        <NavButton 
          icon={<Ghost className="w-6 h-6" />} 
          label="Stories" 
          onClick={() => handleNavigation("/i", "Stories")}
        />
      </div>
    </motion.div>
  );
};

const NavButton = ({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string;
  onClick: () => void;
}) => (
  <motion.button 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="text-snap-yellow/60 hover:text-snap-yellow flex flex-col items-center gap-1 transition-colors"
    onClick={onClick}
  >
    {icon}
    <span className="text-xs font-bold">{label}</span>
  </motion.button>
);

const CreateButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-snap-yellow rounded-full p-4 -mt-8 text-snap-black shadow-lg hover:bg-snap-yellow/90 transition-colors"
    onClick={onClick}
  >
    <Plus className="w-6 h-6" />
    <span className="text-xs font-bold mt-1">Snap</span>
  </motion.button>
);