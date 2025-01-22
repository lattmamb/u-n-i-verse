import { useState, useEffect } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, Camera, Map, BookOpen, Flame, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Map3D from "@/components/Map3D";

const U = () => {
  const [activeTab, setActiveTab] = useState("u");
  const { toast } = useToast();
  const [following, setFollowing] = useState<string[]>([]);
  const navigate = useNavigate();

  const users = [
    { 
      id: "1", 
      name: "Alex Smith", 
      avatar: "/placeholder.svg",
      status: "Just posted a new story!",
      hasStory: true,
      streak: 15
    },
    { 
      id: "2", 
      name: "Jamie Lee", 
      avatar: "/placeholder.svg",
      status: "At Central Park",
      hasStory: true,
      streak: 45
    },
    { 
      id: "3", 
      name: "Chris Wong", 
      avatar: "/placeholder.svg",
      status: "Coffee time ☕",
      hasStory: false,
      streak: 0
    },
  ];

  const handleFollow = (userId: string) => {
    setFollowing((prev) => {
      const isFollowing = prev.includes(userId);
      if (isFollowing) {
        toast({
          title: "Unfollowed",
          description: "You have unfollowed this user",
        });
        return prev.filter((id) => id !== userId);
      } else {
        toast({
          title: "Following",
          description: "You are now following this user",
        });
        return [...prev, userId];
      }
    });
  };

  const handleOpenCamera = () => {
    navigate("/snap-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121520] text-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Stories Bar */}
      <div className="overflow-x-auto px-4 pt-20 pb-4">
        <div className="flex gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-1"
                onClick={handleOpenCamera}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            <span className="text-xs mt-1">Your Story</span>
          </motion.div>

          {users.map((user) => (
            user.hasStory && (
              <motion.div 
                key={user.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <Avatar className="w-16 h-16 border-2 border-purple-500 cursor-pointer">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs mt-1">{user.name.split(' ')[0]}</span>
              </motion.div>
            )
          ))}
        </div>
      </div>

      {/* Mini Map */}
      <div className="mx-4 mb-4 rounded-xl overflow-hidden h-48">
        <Map3D showDetailedView={false} />
      </div>

      {/* Friends List */}
      <div className="px-4 pb-24">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {user.name}
                    {user.streak > 0 && (
                      <span className="flex items-center text-xs bg-yellow-500/20 px-2 py-1 rounded-full">
                        <Flame className="w-3 h-3 text-yellow-500 mr-1" />
                        {user.streak}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-400">{user.status}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleOpenCamera}
                  className="hover:bg-purple-500/20"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFollow(user.id)}
                  className="hover:bg-purple-500/20"
                >
                  {following.includes(user.id) ? (
                    <BookOpen className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenCamera}
          className="hover:bg-purple-500/20"
        >
          <Camera className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/verse')}
          className="hover:bg-purple-500/20"
        >
          <Map className="w-5 h-5" />
        </Button>
      </motion.div>

      <MainNavigation />
    </div>
  );
};

export default U;