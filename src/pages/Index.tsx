import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { VideoCard } from "@/components/VideoCard";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#1A1F2C] min-h-screen">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {mockVideos.map((video) => (
          <div key={video.id} className="snap-start h-screen">
            <VideoCard {...video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;