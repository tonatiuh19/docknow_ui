import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Port } from "@/types";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface PortsMapProps {
  ports: Port[];
}

export default function PortsMap({ ports }: PortsMapProps) {
  const mapRef = useRef<any>(null);

  // Calculate map center based on ports
  const getMapCenter = () => {
    if (ports.length === 0) return [40.7128, -74.006]; // Default to NYC

    const avgLat =
      ports.reduce((sum, port) => sum + port.location.lat, 0) / ports.length;
    const avgLng =
      ports.reduce((sum, port) => sum + port.location.lng, 0) / ports.length;

    return [avgLat, avgLng];
  };

  const center = getMapCenter();

  return (
    <div className="h-full w-full">
      {typeof window !== "undefined" && (
        <MapContainer
          center={center as [number, number]}
          zoom={6}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {ports.map((port) => (
            <Marker
              key={port.id}
              position={[port.location.lat, port.location.lng]}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{port.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {port.location.city}, {port.location.country}
                  </p>
                  <p className="text-sm mb-3">{port.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-ocean-600">
                      ${port.pricePerNight}/night
                    </span>
                    <span className="text-sm text-gray-500">
                      ⭐ {port.rating} ({port.reviews.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`/ports/${port.id}`}
                      className="block w-full bg-gray-100 text-center py-2 px-4 rounded text-sm font-medium hover:bg-gray-200"
                    >
                      View Details
                    </a>
                    <a
                      href={`/booking/${port.id}`}
                      className="block w-full bg-ocean-600 text-white text-center py-2 px-4 rounded text-sm font-medium hover:bg-ocean-700"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
