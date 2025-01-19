import { Map3D } from "@/components/Map3D";
import { MainNavigation } from "@/components/MainNavigation";
import { TabNavigation } from "@/components/TabNavigation";
import { AppStoreDownload } from "@/components/AppStoreDownload";

const Index = () => {
  return (
    <div className="h-screen w-screen relative bg-[#1A1F2C] overflow-hidden">
      <Map3D />
      <MainNavigation />
      <TabNavigation />
      <AppStoreDownload />
    </div>
  );
};

export default Index;