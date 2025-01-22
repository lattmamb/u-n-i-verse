import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Verse3DEnvironment } from "@/components/verse/Verse3DEnvironment";
import { VerseContent } from "@/components/verse/VerseContent";
import Map3D from "@/components/Map3D";

const DECATUR_LOCATION = {
  lat: 39.8403,
  lng: -88.9548
};

const MOCK_USERS = [
  { id: 1, position: [1, 1, 0], active: true },
  { id: 2, position: [-1, -1, 0], active: false },
  { id: 3, position: [2, -1, 1], active: true },
];

const mockVideos = [
  {
    id: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    username: "nature_lover",
    description: "Beautiful spring day in the local park! 🌸 #LocalVibes",
    likes: 1234,
    comments: 88,
    shares: 45,
    location: "Central Park",
    distance: 2.5
  },
  {
    id: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-smartphone-4010-large.mp4",
    username: "tech_sarah",
    description: "Working from our neighborhood café! 💻 #LocalWork",
    likes: 2341,
    comments: 156,
    shares: 89,
    location: "Downtown Café",
    distance: 4.8
  }
];

const Verse = () => {
  const [activeTab, setActiveTab] = useState("verse");
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Location Connected",
      description: "Welcome to Decatur, Illinois!",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] relative overflow-hidden">
      {/* 3D Environment Layer */}
      <Verse3DEnvironment activeUsers={MOCK_USERS} />
      
      {/* Map Layer */}
      <div className="absolute inset-0 opacity-80">
        <Map3D 
          userLocation={DECATUR_LOCATION}
          activeUsers={MOCK_USERS.map(user => ({
            id: user.id,
            lat: DECATUR_LOCATION.lat + (user.position[0] * 0.01),
            lng: DECATUR_LOCATION.lng + (user.position[1] * 0.01),
            active: user.active
          }))}
          showDetailedView={true}
        />
      </div>
      
      {/* Content Layer */}
      <VerseContent 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        videos={mockVideos}
      />
    </div>
  );
};

export default Verse;