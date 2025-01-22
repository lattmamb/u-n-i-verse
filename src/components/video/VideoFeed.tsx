import { motion } from "framer-motion";
import { Play, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
}

export const VideoFeed = () => {
  const [videos] = useState<Video[]>([
    {
      id: "1",
      title: "Introduction to Unity Fleet",
      description: "Learn how to get started with Unity Fleet's services",
      thumbnailUrl: "https://picsum.photos/seed/video1/400/225",
      author: "Unity Fleet Academy",
      likes: 1200,
      comments: 45,
      shares: 89,
    },
    {
      id: "2",
      title: "Advanced Physics Explained",
      description: "Understanding complex physics concepts made simple",
      thumbnailUrl: "https://picsum.photos/seed/video2/400/225",
      author: "Science Hub",
      likes: 892,
      comments: 32,
      shares: 67,
    },
  ]);

  return (
    <div className="space-y-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-lg"
        >
          <div className="relative aspect-video">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <Button
              size="icon"
              className="absolute inset-0 m-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <Play className="w-8 h-8" />
            </Button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{video.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.author}`} />
                  <AvatarFallback>{video.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{video.author}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="w-4 h-4" />
                  {video.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {video.comments}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  {video.shares}
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};