import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

export const VideoCard = ({
  videoUrl,
  username,
  description,
  likes,
  comments,
  shares,
}: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black">
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        loop
        autoPlay
        muted
        playsInline
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-bold">@{username}</h3>
        <p className="text-white/80 text-sm mt-1">{description}</p>
      </div>

      <div className="absolute right-4 bottom-20 flex flex-col gap-6">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1"
        >
          <Heart
            className={`w-8 h-8 ${
              isLiked ? "text-red-500 fill-red-500" : "text-white"
            } transition-colors`}
          />
          <span className="text-white text-sm">{likes}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="text-white text-sm">{comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <Share2 className="w-8 h-8 text-white" />
          <span className="text-white text-sm">{shares}</span>
        </button>
      </div>
    </div>
  );
};