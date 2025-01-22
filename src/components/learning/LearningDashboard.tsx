import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Clock } from "lucide-react";

export const LearningDashboard = () => {
  const progress = [
    {
      id: "1",
      title: "Unity Fleet Mastery",
      progress: 75,
      total: 12,
      completed: 9,
    },
    {
      id: "2",
      title: "Physics Fundamentals",
      progress: 40,
      total: 10,
      completed: 4,
    },
  ];

  const achievements = [
    {
      id: "1",
      title: "Quick Learner",
      description: "Completed 5 courses in a week",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: "2",
      title: "Knowledge Seeker",
      description: "Watched 50+ educational videos",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <div className="space-y-4">
          {progress.map((course) => (
            <Card key={course.id} className="p-4 bg-white/5 backdrop-blur-sm border-none">
              <h3 className="font-medium mb-2">{course.title}</h3>
              <Progress value={course.progress} className="mb-2" />
              <div className="text-sm text-gray-400">
                {course.completed} of {course.total} lessons completed
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-4 bg-white/5 backdrop-blur-sm border-none">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};