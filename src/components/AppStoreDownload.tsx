import { Button } from "@/components/ui/button";
import { Apple, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const AppStoreDownload = () => {
  const { toast } = useToast();

  const handleAppStoreClick = () => {
    // Replace with actual App Store URL in production
    window.open("https://apps.apple.com/your-app", "_blank");
    toast({
      title: "Opening App Store",
      description: "Redirecting you to download the app...",
    });
  };

  const handlePlayStoreClick = () => {
    // Replace with actual Play Store URL in production
    window.open("https://play.google.com/store/apps/your-app", "_blank");
    toast({
      title: "Opening Play Store",
      description: "Redirecting you to download the app...",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50"
    >
      <Button
        onClick={handleAppStoreClick}
        className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
      >
        <Apple className="h-5 w-5" />
        App Store
      </Button>
      <Button
        onClick={handlePlayStoreClick}
        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
      >
        <PlayCircle className="h-5 w-5" />
        Play Store
      </Button>
    </motion.div>
  );
};