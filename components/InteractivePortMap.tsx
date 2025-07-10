import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { MapPin, Home } from "lucide-react";
import { Port } from "@/types";

interface InteractivePortMapProps {
  onPortHover?: (port: Port | null) => void;
  selectedPort?: Port | null;
}

export default function InteractivePortMap({
  onPortHover,
  selectedPort,
}: InteractivePortMapProps) {
  const { ports } = useAppSelector((state) => state.ports);
  const [hoveredPort, setHoveredPort] = useState<Port | null>(null);

  // For now, we'll create a simple visual map representation
  // In a real implementation, you'd use Google Maps, Mapbox, or Leaflet
  const handlePortHover = (port: Port | null) => {
    setHoveredPort(port);
    onPortHover?.(port);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
      {/* Background world map style */}
      <div className="absolute inset-0 opacity-20">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified world map shapes */}
          <path
            d="M100 200 L300 180 L450 150 L600 160 L800 140 L900 180 L850 280 L700 300 L500 320 L350 310 L200 280 Z"
            fill="#0284c7"
            opacity="0.3"
          />
          <path
            d="M150 350 L400 330 L600 340 L750 360 L800 400 L600 420 L300 410 L100 390 Z"
            fill="#0284c7"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Port pins */}
      {ports.map((port) => {
        // Convert lat/lng to relative positions on our map
        // This is a simplified approach - in real implementation use proper map projection
        const x = ((port.location.lng + 180) / 360) * 100;
        const y = ((90 - port.location.lat) / 180) * 100;

        const isHovered = hoveredPort?.id === port.id;
        const isSelected = selectedPort?.id === port.id;

        return (
          <div
            key={port.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            onMouseEnter={() => handlePortHover(port)}
            onMouseLeave={() => handlePortHover(null)}
          >
            {/* Pin */}
            <div
              className={`relative transition-all duration-200 ${
                isHovered || isSelected ? "scale-125 z-20" : "scale-100 z-10"
              }`}
            >
              {port.portType === "private_port" ? (
                <Home
                  className={`w-6 h-6 ${
                    isSelected
                      ? "text-orange-500"
                      : isHovered
                      ? "text-purple-700"
                      : "text-purple-600"
                  } drop-shadow-lg`}
                  fill="currentColor"
                />
              ) : (
                <MapPin
                  className={`w-6 h-6 ${
                    isSelected
                      ? "text-orange-500"
                      : isHovered
                      ? "text-ocean-700"
                      : "text-ocean-600"
                  } drop-shadow-lg`}
                  fill="currentColor"
                />
              )}

              {/* Port info popup */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] z-30">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="text-sm font-semibold text-gray-900">
                      {port.name}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        port.portType === "private_port"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-ocean-100 text-ocean-800"
                      }`}
                    >
                      {port.portType === "private_port" ? "Private" : "Marina"}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {port.location.city}, {port.location.country}
                  </div>
                  <div className="text-xs text-ocean-600 font-medium mt-1">
                    ${port.pricePerNight}/night
                  </div>
                  <div className="text-xs text-gray-500">
                    {port.availableSpaces} spaces available
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <div className="text-xs font-medium text-gray-700 mb-2">
          Available Ports
        </div>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-ocean-600" fill="currentColor" />
            <span>Public Marina</span>
          </div>
          <div className="flex items-center space-x-1">
            <Home className="w-4 h-4 text-purple-600" fill="currentColor" />
            <span>Private Port</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-orange-500" fill="currentColor" />
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
