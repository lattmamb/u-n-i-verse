import Map3D from "@/components/Map3D";
import { MainNavigation } from "@/components/MainNavigation";
import { TabNavigation } from "@/components/TabNavigation";
import { AppStoreDownload } from "@/components/AppStoreDownload";
import { Globe } from "@/components/ui/globe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    { label: "Explore U", route: "/u" },
    { label: "Navigate N", route: "/n" },
    { label: "Discover I", route: "/i" },
    { label: "Enter Verse", route: "/verse" },
  ];

  return (
    <div className="h-screen w-screen relative bg-[#1A1F2C] overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="fixed inset-0 z-0"
      >
        <Globe className="opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1F2C]/80" />
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
                  className="w-full h-24 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex flex-col items-center justify-center gap-2"
                  onClick={() => navigate(button.route)}
                >
                  <span className="text-lg font-semibold">{button.label}</span>
                  <ArrowRight className="w-5 h-5" />
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