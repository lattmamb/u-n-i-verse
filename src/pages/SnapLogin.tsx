import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const SnapLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking for existing Snapchat auth
    const checkExistingAuth = () => {
      const hasAuth = localStorage.getItem("snapchat_linked");
      if (hasAuth) {
        navigate("/");
      }
    };
    checkExistingAuth();
  }, [navigate]);

  const handleSnapLogin = () => {
    // Simulate successful Snapchat login
    localStorage.setItem("snapchat_linked", "true");
    toast({
      title: "Snapchat Connected",
      description: "Your Snapchat account has been linked successfully!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl"
      >
        <div className="text-center">
          <Ghost className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-bold text-white">Connect with Snapchat</h2>
          <p className="mt-2 text-sm text-gray-300">
            Link your Snapchat account to access additional features
          </p>
        </div>

        <Button
          onClick={handleSnapLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 flex items-center justify-center gap-2"
        >
          <Ghost className="h-5 w-5" />
          Continue with Snapchat
        </Button>
      </motion.div>
    </div>
  );
};

export default SnapLogin;