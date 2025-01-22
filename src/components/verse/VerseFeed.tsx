import { VideoCard } from "@/components/VideoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Share2, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

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

interface VerseFeedProps {
  videos: Video[];
}

export const VerseFeed = ({ videos }: VerseFeedProps) => {
  return (
    <div className="space-y-8 mt-4">
      {videos.map((video) => (
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
    </div>
  );
};