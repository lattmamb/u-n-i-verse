import Map3D from "@/components/Map3D";
import { MainNavigation } from "@/components/MainNavigation";
import { TabNavigation } from "@/components/TabNavigation";
import { AppStoreDownload } from "@/components/AppStoreDownload";
import { Globe } from "@/components/ui/globe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("u");
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
        <MainNavigation />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <AppStoreDownload />
      </div>
    </div>
  );
};

export default Index;