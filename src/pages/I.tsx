import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Info, ExternalLink, Heart, MessageCircle, Share2 } from "lucide-react";

const I = () => {
  const [activeTab, setActiveTab] = useState("i");
  const { toast } = useToast();

  const insights = [
    {
      id: "1",
      title: "Campus Events",
      description: "Discover upcoming events and activities happening around your campus",
      likes: 245,
      comments: 56,
      shares: 23,
    },
    {
      id: "2",
      title: "Study Groups",
      description: "Join or create study groups for your courses",
      likes: 189,
      comments: 34,
      shares: 12,
    },
  ];

  const handleAction = (type: string, id: string) => {
    toast({
      title: "Action Successful",
      description: `${type} action completed for insight ${id}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 pt-24 pb-24">
        <div className="flex items-center gap-2 mb-8">
          <Info className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Insights</h1>
        </div>

        <div className="grid gap-6">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white/10 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  {insight.title}
                  <ExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-gray-300 mb-4">{insight.description}</p>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction("Like", insight.id)}
                    className="gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    {insight.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction("Comment", insight.id)}
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {insight.comments}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction("Share", insight.id)}
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {insight.shares}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MainNavigation />
    </div>
  );
};

export default I;