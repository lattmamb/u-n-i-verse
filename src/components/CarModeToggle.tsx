import { Car, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface CarModeToggleProps {
  isCarMode: boolean;
  setIsCarMode: (value: boolean) => void;
  isSnapLinked: boolean;
  setIsSnapLinked: (value: boolean) => void;
}

export const CarModeToggle = ({
  isCarMode,
  setIsCarMode,
  isSnapLinked,
  setIsSnapLinked
}: CarModeToggleProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCarModeToggle = () => {
    setIsCarMode(!isCarMode);
    toast({
      title: isCarMode ? "Phone Mode" : "Car Mode",
      description: isCarMode ? "Switched to phone interface" : "Tap your phone to the car screen to connect",
    });
  };

  const handleSnapLink = () => {
    navigate("/snap-login");
  };

  return (
    <div className="fixed top-4 right-4 flex items-center gap-4">
      <Button
        onClick={handleCarModeToggle}
        variant="outline"
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 flex gap-2"
      >
        <Car className="h-4 w-4" />
        {isCarMode ? "Phone Mode" : "Car Mode"}
      </Button>
      {!isSnapLinked && (
        <Button
          onClick={handleSnapLink}
          variant="outline"
          className="bg-yellow-400/90 hover:bg-yellow-400 text-black flex gap-2"
        >
          <Ghost className="h-4 w-4" />
          Link Snapchat
        </Button>
      )}
    </div>
  );
};

export const CarModePrompt = ({ isCarMode }: { isCarMode: boolean }) => (
  <AnimatePresence>
    {isCarMode && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md p-4 rounded-lg flex items-center gap-3"
      >
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <span className="text-sm text-white">Tap your phone to connect</span>
        <Car className="h-5 w-5 text-primary animate-pulse" />
      </motion.div>
    )}
  </AnimatePresence>
);