import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { AIAssistantControls } from './ai/AIAssistantControls';
import { AIAssistantDisplay } from './ai/AIAssistantDisplay';
import { useAssistantState } from './ai/AIAssistantState';

interface AIAssistantProps {
  onCommand?: (command: string) => void;
  isCarMode: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onCommand, isCarMode }) => {
  const [isListening, setIsListening] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const { toast } = useToast();
  const { assistantState } = useAssistantState();
  
  const handleVoiceCommand = () => {
    const newIsListening = !isListening;
    setIsListening(newIsListening);
    if (!isListening) {
      toast({
        title: "Voice Assistant Activated",
        description: "How can I help you today?",
      });
    }
  };

  const toggleMute = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    toast({
      title: newIsMuted ? "Assistant Muted" : "Assistant Unmuted",
      description: newIsMuted ? "Voice responses disabled" : "Voice responses enabled",
    });
  };

  useEffect(() => {
    if (onCommand) {
      const handleCommand = (command: string) => {
        onCommand(JSON.stringify({ command, timestamp: Date.now() }));
      };
      return () => {
        // Cleanup
      };
    }
  }, [onCommand]);

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
          <AIAssistantDisplay 
            assistantState={assistantState}
            isListening={isListening}
          />
          <AIAssistantControls
            isListening={isListening}
            isMuted={isMuted}
            onVoiceCommand={handleVoiceCommand}
            onToggleMute={toggleMute}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistant;