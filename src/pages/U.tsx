
import Map3D from "@/components/Map3D";
import { MainNavigation } from "@/components/MainNavigation";
import { TabNavigation } from "@/components/TabNavigation";
import { Globe } from "@/components/ui/globe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Expand } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const U = () => {
  const [activeTab, setActiveTab] = useState("u");
  const [isGlobeExpanded, setIsGlobeExpanded] = useState(false);
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleGlobeExpansion = () => {
    setIsGlobeExpanded(!isGlobeExpanded);
    toast({
      title: isGlobeExpanded ? "Globe view minimized" : "Globe view expanded",
      description: "Adjust the view by dragging the globe",
    });
  };

  return (
    <div className="h-screen w-screen relative bg-[#1A1F2C] overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className={`fixed inset-0 z-10 transition-all duration-300 ${
          isGlobeExpanded ? 'scale-125' : ''
        }`}
      >
        <Globe className="opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1F2C]/80" />
      </motion.div>
      
      <div className="relative z-20">
        <Map3D userLocation={null} />
        <MainNavigation />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <motion.div 
          className="fixed bottom-24 right-4 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={toggleGlobeExpansion}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
            size="icon"
          >
            <Expand className={`h-4 w-4 text-white transition-transform duration-300 ${
              isGlobeExpanded ? 'rotate-180' : ''
            }`} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default U;
