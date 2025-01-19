import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: "you", label: "YOU" },
    { id: "i", label: "I" },
    { id: "first", label: "1ST" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 pt-12">
      <div className="flex justify-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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