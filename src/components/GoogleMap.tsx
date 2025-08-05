"use client";
import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["core", "marker", "places", "maps"],
    });

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        console.log("Map: ", Map);
        const mapElement = document.getElementById("map2") as HTMLElement;

        // Check if element exists before creating map
        if (mapElement) {
          const mapInstance = new Map(mapElement, {
            center: { lat: 44.978989427672595, lng: -93.26366523007519 }, // Add default center
            zoom: 10, // Add default zoom
          });
          setMap(mapInstance);
        } else {
          console.error("Map container element not found");
        }
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }, []);

  return (
    <div className="w-full h-full relative">
      <div id="map2" className="w-full h-full" />
      {!map && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-500 text-sm m-0">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
