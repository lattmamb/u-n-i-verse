import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "@/components/VideoCard";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Share2, MessageCircle, Heart, Smartphone, Car, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Map3D from "@/components/Map3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  location: string;
  distance: number;
}

const mockVideos: Video[] = [
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCarMode, setIsCarMode] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Access Granted",
            description: "You'll now see content within 50 miles of your location.",
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Location Access Denied",
            description: "Please enable location services to see local content.",
          });
        }
      );
    }
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
      <Map3D userLocation={userLocation} />
      
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

      <ContainerScroll
        titleComponent={
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white">
              You and I <span className="text-primary">Verse</span>
            </h1>
            <p className="text-lg text-gray-200">
              Connect with your world, on the go
            </p>
            {userLocation && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Location connected</span>
              </div>
            )}
          </motion.div>
        }
      >
        <Tabs defaultValue="feed" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-8 mt-4">
            {mockVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.username}`} />
                      <AvatarFallback>{video.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{video.username}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-300">
                        <MapPin className="w-3 h-3" />
                        <span>{video.location} • {video.distance} miles away</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Follow
                    </Button>
                  </div>
                </div>
                
                <VideoCard {...video} />
                
                <div className="p-4 bg-white/5">
                  <p className="text-sm text-gray-200 mb-3">{video.description}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 text-white">
                      <Heart className="w-4 h-4" />
                      {video.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-white">
                      <MessageCircle className="w-4 h-4" />
                      {video.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-white">
                      <Share2 className="w-4 h-4" />
                      {video.shares}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
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

      <AnimatePresence>
        {isCarMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md p-4 rounded-lg flex items-center gap-3 z-50"
          >
            <Smartphone className="h-5 w-5 text-primary" />
            <span className="text-sm text-white">Tap your phone to connect</span>
            <Link2 className="h-5 w-5 text-primary animate-pulse" />
            <Car className="h-5 w-5 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verse;