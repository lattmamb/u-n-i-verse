import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface TopicCardsProps {
  topics: Topic[];
}

export const TopicCards = ({ topics }: TopicCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <motion.div
          key={topic.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="relative overflow-hidden bg-white/5 backdrop-blur-sm border-none">
            <div className={`absolute inset-0 ${topic.color} opacity-10`} />
            <div className="relative p-6">
              <div className="mb-4">{topic.icon}</div>
              <h3 className="text-lg font-semibold">{topic.title}</h3>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};