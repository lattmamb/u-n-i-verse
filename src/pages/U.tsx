import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, UserPlus, UserCheck } from "lucide-react";

const U = () => {
  const [activeTab, setActiveTab] = useState("u");
  const { toast } = useToast();
  const [following, setFollowing] = useState<string[]>([]);

  const users = [
    { id: "1", name: "Alex Smith", avatar: "AS" },
    { id: "2", name: "Jamie Lee", avatar: "JL" },
    { id: "3", name: "Chris Wong", avatar: "CW" },
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

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 pt-24 pb-24">
        <div className="flex items-center gap-2 mb-8">
          <Users className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Universe</h1>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/10 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-lg font-semibold">
                  {user.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-400">Active Now</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleFollow(user.id)}
                className="gap-2"
              >
                {following.includes(user.id) ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <MainNavigation />
    </div>
  );
};

export default U;