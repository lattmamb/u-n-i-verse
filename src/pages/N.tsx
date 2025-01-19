import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellRing } from "lucide-react";

const N = () => {
  const [activeTab, setActiveTab] = useState("n");
  const { toast } = useToast();
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  const notifications = [
    { id: "1", title: "New Connection", message: "Alex Smith started following you", time: "2m ago" },
    { id: "2", title: "Event Reminder", message: "Campus meetup starts in 1 hour", time: "1h ago" },
    { id: "3", title: "Message", message: "Jamie sent you a new message", time: "3h ago" },
  ];

  const handleNotificationClick = (id: string) => {
    setReadNotifications((prev) => [...new Set([...prev, id])]);
    toast({
      title: "Notification Read",
      description: "Marked as read",
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 pt-24 pb-24">
        <div className="flex items-center gap-2 mb-8">
          <Bell className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Button
              key={notification.id}
              variant="outline"
              className={`w-full p-4 flex flex-col items-start gap-2 ${
                readNotifications.includes(notification.id)
                  ? "bg-white/5"
                  : "bg-white/10"
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-center gap-2 w-full">
                <BellRing className="w-4 h-4" />
                <span className="font-semibold">{notification.title}</span>
                <span className="ml-auto text-sm text-gray-400">
                  {notification.time}
                </span>
              </div>
              <p className="text-sm text-gray-300">{notification.message}</p>
            </Button>
          ))}
        </div>
      </div>

      <MainNavigation />
    </div>
  );
};

export default N;