import { motion } from 'framer-motion';
import type { AssistantState } from './AIAssistantState';

interface AIAssistantDisplayProps {
  assistantState: AssistantState;
  isListening: boolean;
}

export const AIAssistantDisplay = ({ assistantState, isListening }: AIAssistantDisplayProps) => {
  return (
    <>
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
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
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
    </>
  );
};