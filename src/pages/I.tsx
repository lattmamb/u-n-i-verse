import { useState, useEffect } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Flame, 
  Play, 
  BookOpen, 
  Sparkles, 
  GraduationCap,
  Map,
  Library,
  TrendingUp,
  Calendar,
  Video,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { VideoFeed } from "@/components/video/VideoFeed";
import { LearningDashboard } from "@/components/learning/LearningDashboard";
import { TopicCards } from "@/components/learning/TopicCards";
import { LiveSessions } from "@/components/learning/LiveSessions";

const I = () => {
  const [activeTab, setActiveTab] = useState("i");
  const [activeSection, setActiveSection] = useState("feed");
  const { toast } = useToast();

  const topics = [
    {
      id: "1",
      title: "Science & Technology",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      id: "2",
      title: "History & Culture",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      id: "3",
      title: "Personal Development",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-green-500",
    },
  ];

  const navigationItems = [
    { id: "feed", label: "Video Feed", icon: <Play className="w-4 h-4" /> },
    { id: "topics", label: "Topics", icon: <BookOpen className="w-4 h-4" /> },
    { id: "live", label: "Live", icon: <Video className="w-4 h-4" /> },
    { id: "library", label: "Library", icon: <Library className="w-4 h-4" /> },
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    toast({
      title: `Switching to ${section}`,
      description: "Loading content...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121520] text-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Navigation Bar */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-36 pb-24">
        <AnimatePresence mode="wait">
          {activeSection === "feed" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VideoFeed />
            </motion.div>
          )}

          {activeSection === "topics" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TopicCards topics={topics} />
            </motion.div>
          )}

          {activeSection === "live" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LiveSessions />
            </motion.div>
          )}

          {activeSection === "library" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LearningDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MainNavigation />
    </div>
  );
};

export default I;