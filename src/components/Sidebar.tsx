"use client";
import { useState } from "react";

export default function Sidebar() {
  const minLocations = 3;
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const addLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleOptimizeRoute = async () => {
    if (locations.length < minLocations) {
      alert(
        "Please add at least " +
          minLocations +
          " locations to optimize a route."
      );
      return;
    }

    setIsOptimizing(true);
    try {
      // Placeholder for route optimization logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error optimizing route:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const clearAll = () => {
    setLocations([]);
  };

  return (
    <aside className="bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <h2 className="flex items-center m-0 text-xl font-semibold text-[#1f2937]">
          <svg
            className="text-blue-600 w-5 h-5 mr-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Route Planner
        </h2>
        <p className="m-0 text-sm text-gray-500 mt-1">
          Add locations to optimize your route
        </p>
      </div>

      {/* Add Location Form */}
      <div className="border-b border-gray-200 p-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Add Location
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLocation()}
            placeholder="Enter address or place name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={addLocation}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors cursor-pointer border-none"
          >
            Add
          </button>
        </div>
      </div>

      {/* Locations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="m-0 text-sm font-medium text-gray-700">
              Locations ({locations.length})
            </h3>
            {locations.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {locations.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="m-0 text-gray-500 text-sm">
                No locations added yet
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Add locations to start planning your route
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-800 truncate">
                      {location}
                    </span>
                  </div>
                  <button
                    onClick={() => removeLocation(index)}
                    className="text-gray-400 hover:text-red-500 bg-transparent border-none p-1 cursor-pointer transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <button
          onClick={handleOptimizeRoute}
          disabled={locations.length < minLocations || isOptimizing}
          className={`w-full px-4 py-3 font-medium rounded-md transition-colors border-none ${
            locations.length < minLocations || isOptimizing
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          }`}
        >
          {isOptimizing ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
              Optimizing...
            </div>
          ) : (
            "Optimize Route"
          )}
        </button>

        <div className="text-center mt-3 text-xs text-gray-500">
          {locations.length < minLocations
            ? "Add at least " + minLocations + " locations to optimize"
            : `Ready to optimize ${locations.length} locations`}
        </div>
      </div>
    </aside>
  );
}
