import { motion } from "framer-motion";
import { Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LiveSessions = () => {
  const sessions = [
    {
      id: "1",
      title: "Advanced Unity Fleet Features",
      instructor: "Sarah Johnson",
      attendees: 234,
      startTime: "2:00 PM",
      thumbnail: "https://picsum.photos/seed/live1/400/225",
    },
    {
      id: "2",
      title: "Interactive Physics Workshop",
      instructor: "Dr. Michael Chen",
      attendees: 156,
      startTime: "3:30 PM",
      thumbnail: "https://picsum.photos/seed/live2/400/225",
    },
  ];

  return (
    <div className="space-y-6">
      {sessions.map((session) => (
        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-lg"
        >
          <div className="relative aspect-video">
            <img
              src={session.thumbnail}
              alt={session.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button variant="secondary" className="gap-2">
                <Video className="w-4 h-4" />
                Join Live
              </Button>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{session.instructor}</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {session.attendees} attending
              </div>
              <span>Starts at {session.startTime}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};