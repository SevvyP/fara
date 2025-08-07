"use client";
import { useState } from "react";
import GoogleMap from "../components/GoogleMap";
import TitleBar from "../components/TitleBar";
import Sidebar from "../components/Sidebar";

// Define a type for location data
interface LocationData {
  id: string;
  name?: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  placeId?: string;
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Title Bar - 10% of screen height */}
      <div className="h-[10vh]">
        <TitleBar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Main Content Area - 90% of screen height */}
      <div className="h-[90vh] flex relative">
        {/* Sidebar - Responsive */}
        <div
          className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
          fixed lg:relative 
          w-full lg:w-[30%] 
          h-[90vh] lg:h-full
          top-[10vh] lg:top-0
          z-40 
          transition-transform 
          duration-300 
          ease-in-out
        `}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            locations={locations}
            setLocations={setLocations}
          />
        </div>

        {/* Overlay for mobile - only covers the map area below title bar */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed top-[10vh] left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Map Area - Responsive */}
        <div className="w-full lg:w-[70%] relative">
          <GoogleMap locations={locations} />
        </div>
      </div>
    </div>
  );
}
