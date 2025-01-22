import { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";
import { Smartphone, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Map3D from "@/components/Map3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerseFeed } from "@/components/verse/VerseFeed";
import { VerseCarMode } from "@/components/verse/VerseCarMode";
import { VerseHeader } from "@/components/verse/VerseHeader";

const DECATUR_LOCATION = {
  lat: 39.8403,
  lng: -88.9548
};

const MOCK_USERS = [
  { id: 1, lat: 39.8503, lng: -88.9648, active: true },
  { id: 2, lat: 39.8303, lng: -88.9448, active: false },
  { id: 3, lat: 39.8603, lng: -88.9748, active: true },
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
  const [isCarMode, setIsCarMode] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Location Connected",
      description: "Welcome to Decatur, Illinois!",
    });
  }, [toast]);

  const handleCarModeToggle = () => {
    setIsCarMode(!isCarMode);
    toast({
      title: isCarMode ? "Phone Mode" : "Car Mode",
      description: isCarMode ? "Switched to phone interface" : "Tap your phone to the car screen to connect",
    });
  };

  return (
    <div className="min-h-screen bg-transparent relative">
      <Map3D 
        userLocation={DECATUR_LOCATION}
        activeUsers={MOCK_USERS}
        showDetailedView={true}
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 right-4 z-50 mt-20"
      >
        <Button
          onClick={handleCarModeToggle}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 flex gap-2"
        >
          {isCarMode ? <Smartphone className="h-4 w-4" /> : <Car className="h-4 w-4" />}
          {isCarMode ? "Phone Mode" : "Car Mode"}
        </Button>
      </motion.div>

      <div className="relative z-10 mt-[40vh]">
        <ContainerScroll titleComponent={<VerseHeader />}>
          <Tabs defaultValue="feed" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <VerseFeed videos={mockVideos} />
            </TabsContent>

            <TabsContent value="explore" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                Explore content coming soon...
              </div>
            </TabsContent>

            <TabsContent value="messages" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                Messages coming soon...
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                Profile coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </ContainerScroll>
      </div>

      <VerseCarMode isCarMode={isCarMode} />
    </div>
  );
};

export default Verse;