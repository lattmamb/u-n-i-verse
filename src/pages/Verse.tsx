import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VideoCard } from "@/components/VideoCard";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Share2, MessageCircle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  useEffect(() => {
    // Request location permission
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

  return (
    <div className="min-h-screen bg-white">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-black">
              Local <span className="text-primary">Verse</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover what's happening within 50 miles of you
            </p>
            {userLocation && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>Location access enabled</span>
              </div>
            )}
          </div>
        }
      >
        <div className="space-y-8">
          {mockVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.username}`} />
                    <AvatarFallback>{video.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-black">{video.username}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
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
              
              <div className="p-4 bg-gray-50">
                <p className="text-sm text-gray-700 mb-3">{video.description}</p>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Heart className="w-4 h-4" />
                    {video.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {video.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Share2 className="w-4 h-4" />
                    {video.shares}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ContainerScroll>
    </div>
  );
};

export default Verse;