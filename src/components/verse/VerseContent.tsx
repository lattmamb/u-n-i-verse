import { motion } from 'framer-motion';
import { VerseFeed } from './VerseFeed';
import { SearchBar } from '../SearchBar';
import { TabNavigation } from '../TabNavigation';

interface VerseContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  videos: any[];
}

export const VerseContent = ({ activeTab, onTabChange, videos }: VerseContentProps) => {
  return (
    <motion.div
      className="relative z-10 mt-[40vh] bg-gradient-to-b from-transparent to-black/80 backdrop-blur-sm rounded-t-3xl"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <SearchBar />
          <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
        </div>
        <VerseFeed videos={videos} />
      </div>
    </motion.div>
  );
};