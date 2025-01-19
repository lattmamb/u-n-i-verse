import Map3D from "@/components/Map3D";
import { MainNavigation } from "@/components/MainNavigation";
import { TabNavigation } from "@/components/TabNavigation";
import { AppStoreDownload } from "@/components/AppStoreDownload";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("u");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen w-screen relative bg-[#1A1F2C] overflow-hidden">
      <Map3D userLocation={null} />
      <MainNavigation />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <AppStoreDownload />
    </div>
  );
};

export default Index;