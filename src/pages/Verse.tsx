import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";
import { Smartphone, Car, Layers, MessageCircle, Navigation2, Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Map3D from "@/components/Map3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerseFeed } from "@/components/verse/VerseFeed";
import { VerseCarMode } from "@/components/verse/VerseCarMode";
import { VerseHeader } from "@/components/verse/VerseHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const DECATUR_LOCATION = {
  lat: 39.8403,
  lng: -88.9548
};

const MOCK_USERS = [
  { id: 1, lat: 39.8503, lng: -88.9648, active: true, name: "Sarah K.", avatar: "/placeholder.svg" },
  { id: 2, lat: 39.8303, lng: -88.9448, active: false, name: "Mike R.", avatar: "/placeholder.svg" },
  { id: 3, lat: 39.8603, lng: -88.9748, active: true, name: "Alex T.", avatar: "/placeholder.svg" },
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
  const [mapStyle, setMapStyle] = useState("satellite");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
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

  const filteredUsers = showActiveOnly ? MOCK_USERS.filter(user => user.active) : MOCK_USERS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] relative">
      <Map3D 
        userLocation={DECATUR_LOCATION}
        activeUsers={filteredUsers}
        showDetailedView={true}
      />
      
      {/* Control Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 right-4 z-50 mt-20 flex flex-col gap-2"
      >
        <Button
          onClick={handleCarModeToggle}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 flex gap-2 transition-all duration-300 hover:scale-105"
        >
          {isCarMode ? <Smartphone className="h-4 w-4" /> : <Car className="h-4 w-4" />}
          {isCarMode ? "Phone Mode" : "Car Mode"}
        </Button>
        
        <Button
          onClick={() => setMapStyle(prev => prev === "satellite" ? "streets" : "satellite")}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 flex gap-2 transition-all duration-300 hover:scale-105"
        >
          <Layers className="h-4 w-4" />
          {mapStyle === "satellite" ? "Street View" : "Satellite View"}
        </Button>

        <Button
          onClick={() => setShowActiveOnly(!showActiveOnly)}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 flex gap-2 transition-all duration-300 hover:scale-105"
        >
          <Navigation2 className="h-4 w-4" />
          {showActiveOnly ? "Show All" : "Active Only"}
        </Button>
      </motion.div>

      {/* Friend List Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-24 z-50 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl"
      >
        <h3 className="text-white mb-6 font-semibold text-lg">Nearby Friends</h3>
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <motion.div 
              key={user.id} 
              className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Avatar className={`ring-2 ${user.active ? 'ring-green-500' : 'ring-red-500'} h-12 w-12`}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-white/60 text-xs">{user.active ? 'Active now' : 'Inactive'}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 mt-[40vh]">
        <ContainerScroll titleComponent={<VerseHeader />}>
          <Tabs defaultValue="feed" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md rounded-xl p-1">
              <TabsTrigger 
                value="feed"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Feed
              </TabsTrigger>
              <TabsTrigger 
                value="explore"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Explore
              </TabsTrigger>
              <TabsTrigger 
                value="messages"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger 
                value="profile"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-4">
              <VerseFeed videos={mockVideos} />
            </TabsContent>

            <TabsContent value="explore" className="mt-4">
              <div className="text-center text-gray-400 py-8 bg-white/5 backdrop-blur-md rounded-xl">
                Explore content coming soon...
              </div>
            </TabsContent>

            <TabsContent value="messages" className="mt-4">
              <div className="text-center text-gray-400 py-8 bg-white/5 backdrop-blur-md rounded-xl">
                Messages coming soon...
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-4">
              <div className="text-center text-gray-400 py-8 bg-white/5 backdrop-blur-md rounded-xl">
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