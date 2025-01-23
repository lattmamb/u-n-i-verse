import { Play, BookOpen, Video, Library } from 'lucide-react';

export const navigationItems = [
  { id: "feed", label: "Video Feed", icon: <Play className="w-4 h-4" /> },
  { id: "topics", label: "Topics", icon: <BookOpen className="w-4 h-4" /> },
  { id: "live", label: "Live", icon: <Video className="w-4 h-4" /> },
  { id: "library", label: "Library", icon: <Library className="w-4 h-4" /> },
];