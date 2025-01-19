import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const navigate = useNavigate();
  const tabs = [
    { id: "u", label: "U", path: "/u" },
    { id: "n", label: "N", path: "/n" },
    { id: "i", label: "I", path: "/i" },
    { id: "verse", label: "VERSE", path: "/verse" },
  ];

  const handleTabClick = (tab: { id: string; path: string }) => {
    onTabChange(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 pt-12">
      <div className="flex justify-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "text-lg font-semibold transition-all",
              activeTab === tab.id
                ? "text-white scale-110"
                : "text-white/60 hover:text-white/80"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};