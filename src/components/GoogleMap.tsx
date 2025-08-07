"use client";
import { useState, useEffect, useRef } from "react";
import { getGoogleMapsLoader } from "@/utils/googleMapsLoader";

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

interface GoogleMapProps {
  locations: LocationData[];
}

export default function GoogleMap({ locations }: GoogleMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  useEffect(() => {
    const loader = getGoogleMapsLoader();

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        const mapElement = document.getElementById("map2") as HTMLElement;

        // Check if element exists before creating map
        if (mapElement) {
          const mapInstance = new Map(mapElement, {
            center: { lat: 44.978989427672595, lng: -93.26366523007519 }, // Add default center
            zoom: 10, // Add default zoom
            gestureHandling: "cooperative",
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

  // Effect to manage markers based on locations
  useEffect(() => {
    if (!map) return;

    const updateMarkers = () => {
      // Clear all existing markers first
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current.clear();

      // Add markers for all locations with coordinates (this ensures proper numbering)
      locations.forEach((location, index) => {
        if (location.coordinates) {
          const marker = new google.maps.Marker({
            position: {
              lat: location.coordinates.lat,
              lng: location.coordinates.lng,
            },
            map: map,
            title: location.name || location.address,
            label: {
              text: (index + 1).toString(),
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
            },
            icon: {
              path: "M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13C19,5.13 15.87,2 12,2z",
              fillColor: "#2563eb",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 2.5,
              anchor: new google.maps.Point(12, 24),
              labelOrigin: new google.maps.Point(12, 9),
            },
          });

          markersRef.current.set(location.id, marker);
        }
      });

      // Adjust map bounds to fit all markers if there are any
      if (locations.length > 0 && locations.some((loc) => loc.coordinates)) {
        const bounds = new google.maps.LatLngBounds();
        locations.forEach((location) => {
          if (location.coordinates) {
            bounds.extend({
              lat: location.coordinates.lat,
              lng: location.coordinates.lng,
            });
          }
        });
        map.fitBounds(bounds);

        // Set a minimum zoom level if there's only one location
        if (locations.filter((loc) => loc.coordinates).length === 1) {
          setTimeout(() => {
            if (map.getZoom() && map.getZoom()! > 15) {
              map.setZoom(15);
            }
          }, 100);
        }
      }
    };

    updateMarkers();
  }, [map, locations]);

  // Cleanup effect to remove all markers on unmount
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current.clear();
    };
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
