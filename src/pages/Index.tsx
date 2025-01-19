import { useState, useEffect } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { VideoCard } from "@/components/VideoCard";
import { MainNavigation } from "@/components/MainNavigation";
import { CarModeToggle, CarModePrompt } from "@/components/CarModeToggle";
import { SearchBar } from "@/components/SearchBar";
import Map3D from "@/components/Map3D";
import AIAssistant from "@/components/AIAssistant";
import { motion } from "framer-motion";

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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's location for the map
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        // Default to Chicago
        setUserLocation({ lat: 41.8781, lng: -87.6298 });
      }
    );
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#1A1F2C] min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#1A1F2C] to-[#1A1F2C]" />
        <div className="stars absolute inset-0" />
      </div>

      {/* 3D Map Background */}
      <Map3D userLocation={userLocation} />

      {/* Top Navigation and Search */}
      <div className="relative z-50">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="fixed top-4 left-4 flex items-center gap-4">
          <SearchBar />
        </div>
        <CarModeToggle
          isCarMode={isCarMode}
          setIsCarMode={setIsCarMode}
          isSnapLinked={isSnapLinked}
          setIsSnapLinked={setIsSnapLinked}
        />
      </div>

      {/* AI Assistant */}
      <AIAssistant isCarMode={isCarMode} />

      {/* Main Content */}
      <motion.div 
        className="snap-y snap-mandatory h-screen overflow-y-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {mockVideos.map((video) => (
          <motion.div 
            key={video.id} 
            className="snap-start h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoCard {...video} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Navigation */}
      <MainNavigation />

      {/* Car Mode Connection Prompt */}
      <CarModePrompt isCarMode={isCarMode} />
    </div>
  );
};

export default Index;