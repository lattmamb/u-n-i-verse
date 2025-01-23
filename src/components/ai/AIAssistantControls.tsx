import { Button } from '@/components/ui/button';
import { Mic, MicOff, Settings, Volume2, VolumeX } from 'lucide-react';

interface AIAssistantControlsProps {
  isListening: boolean;
  isMuted: boolean;
  onVoiceCommand: () => void;
  onToggleMute: () => void;
}

export const AIAssistantControls = ({
  isListening,
  isMuted,
  onVoiceCommand,
  onToggleMute,
}: AIAssistantControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className="bg-white/10 hover:bg-white/20"
        onClick={onVoiceCommand}
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
        onClick={onToggleMute}
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
  );
};