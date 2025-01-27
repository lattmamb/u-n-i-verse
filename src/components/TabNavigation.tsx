import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const navigate = useNavigate();
  const tabs = [
    { id: "u", label: "Camera", path: "/u", isMain: true },
    { id: "n", label: "Chat", path: "/n", isMain: false },
    { id: "i", label: "Map", path: "/i", isMain: true },
    { id: "verse", label: "Stories", path: "/verse", isMain: true },
  ];

  const handleTabClick = (tab: { id: string; path: string }) => {
    onTabChange(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 pt-12">
      <div className="flex justify-center items-center gap-2">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => handleTabClick(tab)}
              className={cn(
                "transition-all",
                tab.isMain
                  ? "text-lg font-bold"
                  : "text-sm font-normal opacity-50",
                activeTab === tab.id
                  ? "text-snap-yellow scale-110"
                  : "text-snap-yellow/60 hover:text-snap-yellow/80"
              )}
            >
              {tab.label}
            </button>
            {index < tabs.length - 1 && (
              <span className="text-snap-yellow/20 mx-2">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};