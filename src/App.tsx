import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import U from "./pages/U";
import N from "./pages/N";
import I from "./pages/I";
import Verse from "./pages/Verse";
import SnapLogin from "./pages/SnapLogin";

const queryClient = new QueryClient();

const HomeButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHomeClick = () => {
    toast({
      title: "Navigating home",
      description: "Taking you back to the main page",
    });
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 z-50"
    >
      <Button
        variant="ghost"
        size="icon"
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
        onClick={handleHomeClick}
      >
        <Home className="h-4 w-4 text-white" />
      </Button>
    </motion.div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HomeButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/u" element={<U />} />
          <Route path="/n" element={<N />} />
          <Route path="/i" element={<I />} />
          <Route path="/verse" element={<Verse />} />
          <Route path="/snap-login" element={<SnapLogin />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;