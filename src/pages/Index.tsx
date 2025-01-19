import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { VideoCard } from "@/components/VideoCard";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Home, Users, User, Car, MapPin, Ghost, Calendar, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const mockVideos = [
  {
    id: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    username: "nature_lover",
    description: "Beautiful spring day! 🌸",
    likes: 1234,
    comments: 88,
    shares: 45,
  },
  {
    id: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-smartphone-4010-large.mp4",
    username: "tech_sarah",
    description: "Working from anywhere! 💻",
    likes: 2341,
    comments: 156,
    shares: 89,
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("u");
  const [isCarMode, setIsCarMode] = useState(false);
  const [isSnapLinked, setIsSnapLinked] = useState(false);
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCarModeToggle = () => {
    setIsCarMode(!isCarMode);
    toast({
      title: isCarMode ? "Phone Mode" : "Car Mode",
      description: isCarMode ? "Switched to phone interface" : "Tap your phone to the car screen to connect",
    });
  };

  const handleSnapLink = () => {
    setIsSnapLinked(true);
    toast({
      title: "Snapchat Linked",
      description: "Your Snapchat account has been connected successfully!",
    });
  };

  return (
    <div className="bg-[#1A1F2C] min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#1A1F2C] to-[#1A1F2C]" />
        <div className="stars absolute inset-0" />
      </div>

      {/* Top Navigation and Search */}
      <div className="relative z-50">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-48"
            />
            <Search className="absolute right-3 top-2.5 text-white/50 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {mockVideos.map((video) => (
          <div key={video.id} className="snap-start h-screen">
            <VideoCard {...video} />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        <div className="flex justify-around items-center max-w-screen-sm mx-auto">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/60 hover:text-white flex flex-col items-center gap-1"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/60 hover:text-white flex flex-col items-center gap-1"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-500 rounded-full p-4 -mt-8 text-white shadow-lg hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs font-semibold mt-1">Create</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/60 hover:text-white flex flex-col items-center gap-1"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Schedule</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/60 hover:text-white flex flex-col items-center gap-1"
          >
            <Navigation className="w-6 h-6" />
            <span className="text-xs">Navigate</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Car Mode Connection Prompt */}
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
    </div>
  );
};

export default Index;