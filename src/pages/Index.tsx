import Map3D from "@/components/Map3D";
import { MainNavigation } from "@/components/MainNavigation";
import { TabNavigation } from "@/components/TabNavigation";
import { AppStoreDownload } from "@/components/AppStoreDownload";
import { Globe } from "@/components/ui/globe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Ghost, Camera, MessageCircle, Map } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("u");
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const navigationButtons = [
    { label: "Camera", icon: <Camera className="w-6 h-6" />, route: "/u" },
    { label: "Chat", icon: <MessageCircle className="w-6 h-6" />, route: "/n" },
    { label: "Map", icon: <Map className="w-6 h-6" />, route: "/i" },
    { label: "Stories", icon: <Ghost className="w-6 h-6" />, route: "/verse" },
  ];

  return (
    <div className="h-screen w-screen relative bg-snap-black overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="fixed inset-0 z-0"
      >
        <Globe className="opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-snap-black/80" />
      </motion.div>
      
      <div className="relative z-10">
        <Map3D userLocation={null} />
        
        {/* Navigation Grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 p-4 max-w-2xl w-full">
            {navigationButtons.map((button) => (
              <motion.div
                key={button.route}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="w-full h-24 bg-snap-yellow/10 backdrop-blur-sm hover:bg-snap-yellow/20 flex flex-col items-center justify-center gap-2 border-2 border-snap-yellow/20 group transition-all duration-300"
                  onClick={() => navigate(button.route)}
                >
                  <div className="text-snap-yellow group-hover:text-snap-yellow/80 transition-colors">
                    {button.icon}
                  </div>
                  <span className="text-lg font-bold text-snap-yellow group-hover:text-snap-yellow/80 transition-colors">
                    {button.label}
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <MainNavigation />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <AppStoreDownload />
      </div>
    </div>
  );
};

export default Index;