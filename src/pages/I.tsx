import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { VideoFeed } from "@/components/video/VideoFeed";
import { LearningDashboard } from "@/components/learning/LearningDashboard";
import { TopicCards } from "@/components/learning/TopicCards";
import { LiveSessions } from "@/components/learning/LiveSessions";
import { navigationItems } from "@/components/learning/NavigationItems";
import { topics } from "@/components/learning/TopicsList";

const I = () => {
  const [activeTab, setActiveTab] = useState("i");
  const [activeSection, setActiveSection] = useState("feed");
  const { toast } = useToast();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    toast({
      title: `Switching to ${section}`,
      description: "Loading content...",
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <VideoFeed />;
      case "topics":
        return <TopicCards topics={topics} />;
      case "live":
        return <LiveSessions />;
      case "library":
        return <LearningDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121520] text-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="fixed top-20 left-0 right-0 z-40 bg-black/20 backdrop-blur-lg">
        <div className="flex justify-around items-center p-4 max-w-screen-xl mx-auto">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleSectionChange(item.id)}
              className="flex items-center gap-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pt-36 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <MainNavigation />
    </div>
  );
};

export default I;