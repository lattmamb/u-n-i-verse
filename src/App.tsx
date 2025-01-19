import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import U from "./pages/U";
import N from "./pages/N";
import I from "./pages/I";
import Verse from "./pages/Verse";
import SnapLogin from "./pages/SnapLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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