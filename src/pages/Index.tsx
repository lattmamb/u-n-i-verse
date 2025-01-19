import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { VideoCard } from "@/components/VideoCard";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Home, Users, User } from "lucide-react";

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
    <div className="bg-[#1A1F2C] min-h-screen relative overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#1A1F2C] to-[#1A1F2C]" />
        <div className="stars absolute inset-0" />
      </div>

      {/* Top Navigation and Search */}
      <div className="relative z-50">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="fixed top-4 right-4">
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex justify-around items-center max-w-screen-sm mx-auto">
          <button className="text-white/60 hover:text-white flex flex-col items-center gap-1">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="text-white/60 hover:text-white flex flex-col items-center gap-1">
            <Users className="w-6 h-6" />
            <span className="text-xs">Friends</span>
          </button>
          <button className="bg-purple-500 rounded-full p-4 -mt-8 text-white shadow-lg hover:bg-purple-600 transition-colors">
            <Plus className="w-6 h-6" />
            <span className="text-xs font-semibold mt-1">U Create</span>
          </button>
          <button className="text-white/60 hover:text-white flex flex-col items-center gap-1">
            <User className="w-6 h-6" />
            <span className="text-xs">I</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;