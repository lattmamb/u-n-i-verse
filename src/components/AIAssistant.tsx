import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Settings, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface AIAssistantProps {
  onCommand?: (command: string) => void;
  isCarMode: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onCommand, isCarMode }) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  
  // Simulated assistant state
  const [assistantState, setAssistantState] = useState({
    temperature: "72°F",
    wiperStatus: "Off",
    windowStatus: "Closed",
    currentRoute: "Home → Office",
  });

  const handleVoiceCommand = () => {
    setIsListening(prev => !prev);
    if (!isListening) {
      toast({
        title: "Voice Assistant Activated",
        description: "How can I help you today?",
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    toast({
      title: isMuted ? "Assistant Unmuted" : "Assistant Muted",
      description: isMuted ? "Voice responses enabled" : "Voice responses disabled",
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={`fixed bottom-24 right-4 z-50 ${isCarMode ? 'scale-150' : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
              animate={{ 
                scale: isListening ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                repeat: isListening ? Infinity : 0,
                duration: 1.5 
              }}
            >
              <div className="relative">
                {/* Ripple effect when listening */}
                {isListening && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                {/* Core avatar circle */}
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative z-10"
                  animate={{ 
                    rotate: isListening ? [0, 360] : 0 
                  }}
                  transition={{ 
                    repeat: isListening ? Infinity : 0, 
                    duration: 3 
                  }}
                >
                  <span className="text-white font-bold">J</span>
                </motion.div>
              </div>
            </motion.div>
            <div className="text-white">
              <h3 className="font-semibold">JARVIS</h3>
              <p className="text-xs text-white/70">AI Assistant</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="text-sm text-white/80">
              <div className="flex justify-between">
                <span>Temperature:</span>
                <span>{assistantState.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span>Wipers:</span>
                <span>{assistantState.wiperStatus}</span>
              </div>
              <div className="flex justify-between">
                <span>Windows:</span>
                <span>{assistantState.windowStatus}</span>
              </div>
              <div className="flex justify-between">
                <span>Route:</span>
                <span>{assistantState.currentRoute}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={handleVoiceCommand}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-white" />
              ) : (
                <Mic className="h-4 w-4 text-white" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
            >
              <Settings className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistant;