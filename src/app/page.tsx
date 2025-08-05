import GoogleMap from "../components/GoogleMap";
import TitleBar from "../components/TitleBar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Title Bar - 10% of screen height */}
      <div className="h-[10vh]">
        <TitleBar />
      </div>

      {/* Main Content Area - 90% of screen height */}
      <div className="h-[90vh] flex">
        {/* Sidebar - 30% of remaining width */}
        <div className="w-[30%]">
          <Sidebar />
        </div>

        {/* Map Area - 70% of remaining width */}
        <div className="w-[70%] relative">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
}
