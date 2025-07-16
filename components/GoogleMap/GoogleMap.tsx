import { useEffect, useRef, useState } from "react";
import { Anchor } from "lucide-react";

// Google Maps type declarations
declare global {
  interface Window {
    google: any;
  }
}

interface Port {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "marina" | "private";
  rating: number;
  pricePerNight: number;
}

interface GoogleMapProps {
  ports?: Port[];
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
}

// Mock ports data for demonstration
const mockPorts: Port[] = [
  {
    id: "1",
    name: "Monaco Yacht Club",
    lat: 43.7384,
    lng: 7.4246,
    type: "marina",
    rating: 4.8,
    pricePerNight: 850,
  },
  {
    id: "2",
    name: "Port Hercules",
    lat: 43.7347,
    lng: 7.4197,
    type: "marina",
    rating: 4.9,
    pricePerNight: 1200,
  },
  {
    id: "3",
    name: "Marina di Portofino",
    lat: 44.3031,
    lng: 9.2108,
    type: "marina",
    rating: 4.7,
    pricePerNight: 650,
  },
  {
    id: "4",
    name: "Club de Mar Mallorca",
    lat: 39.5538,
    lng: 2.6199,
    type: "marina",
    rating: 4.6,
    pricePerNight: 480,
  },
  {
    id: "5",
    name: "Marina Port Vell",
    lat: 41.3751,
    lng: 2.1847,
    type: "marina",
    rating: 4.5,
    pricePerNight: 380,
  },
  {
    id: "6",
    name: "Porto Montenegro",
    lat: 42.4374,
    lng: 18.6911,
    type: "marina",
    rating: 4.9,
    pricePerNight: 720,
  },
  {
    id: "7",
    name: "Antibes Port Vauban",
    lat: 43.5847,
    lng: 7.1257,
    type: "marina",
    rating: 4.4,
    pricePerNight: 520,
  },
  {
    id: "8",
    name: "Marina di Stabia",
    lat: 40.7022,
    lng: 14.5189,
    type: "marina",
    rating: 4.3,
    pricePerNight: 320,
  },
  {
    id: "9",
    name: "Private Dock Cannes",
    lat: 43.5528,
    lng: 7.0174,
    type: "private",
    rating: 4.8,
    pricePerNight: 950,
  },
  {
    id: "10",
    name: "Exclusive Berth Nice",
    lat: 43.6951,
    lng: 7.2758,
    type: "private",
    rating: 4.9,
    pricePerNight: 1100,
  },
];

export default function GoogleMap({
  ports = mockPorts,
  height = "400px",
  zoom = 6,
  center = { lat: 42.5, lng: 12.5 }, // Mediterranean center
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Check if API key is available
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    setHasApiKey(!!apiKey && apiKey !== "your_google_maps_api_key_here");
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!hasApiKey) return;

    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else if (window.google) {
      setIsLoaded(true);
    }
  }, [hasApiKey]);

  // Initialize map
  useEffect(() => {
    if (
      isLoaded &&
      mapRef.current &&
      !googleMapRef.current &&
      window.google &&
      hasApiKey
    ) {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        zoom,
        center,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#a2daf2",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [
              {
                color: "#f7f1df",
              },
            ],
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#d0e3b4",
              },
            ],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      });
    }
  }, [isLoaded, zoom, center, hasApiKey]);

  // Add markers
  useEffect(() => {
    if (googleMapRef.current && isLoaded && window.google && hasApiKey) {
      // Clear existing markers
      markersRef.current.forEach((marker: any) => marker.setMap(null));
      markersRef.current = [];

      ports.forEach((port) => {
        const marker = new window.google.maps.Marker({
          position: { lat: port.lat, lng: port.lng },
          map: googleMapRef.current,
          title: port.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: port.type === "private" ? 10 : 8,
            fillColor: port.type === "private" ? "#F59E0B" : "#475569",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
          },
          animation: window.google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 min-w-[200px]">
              <h3 class="font-semibold text-gray-900 mb-2">${port.name}</h3>
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Type:</span>
                  <span class="text-sm font-medium ${
                    port.type === "private"
                      ? "text-amber-600"
                      : "text-slate-600"
                  }">${port.type === "private" ? "Private" : "Marina"}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Rating:</span>
                  <span class="text-sm font-medium text-yellow-600">${
                    port.rating
                  } ⭐</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Price:</span>
                  <span class="text-sm font-medium text-gray-900">$${
                    port.pricePerNight
                  }/night</span>
                </div>
              </div>
              <button class="w-full mt-3 bg-slate-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                View Details
              </button>
            </div>
          `,
        });

        marker.addListener("click", () => {
          setSelectedPort(port);
          infoWindow.open(googleMapRef.current, marker);
        });

        markersRef.current.push(marker);
      });
    }
  }, [ports, isLoaded, hasApiKey]);

  // Fallback component while loading or no API key
  if (!hasApiKey) {
    return (
      <div
        className="w-full relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl overflow-hidden"
        style={{ height }}
      >
        {/* Interactive Map Placeholder */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Mediterranean coastline */}
            <path
              d="M0 180 Q100 160 200 170 T400 180 L400 300 L0 300 Z"
              fill="#475569"
              opacity="0.3"
            />
            {/* Land masses */}
            <ellipse
              cx="80"
              cy="120"
              rx="40"
              ry="25"
              fill="#64748b"
              opacity="0.4"
            />
            <ellipse
              cx="200"
              cy="100"
              rx="50"
              ry="30"
              fill="#64748b"
              opacity="0.4"
            />
            <ellipse
              cx="320"
              cy="130"
              rx="35"
              ry="20"
              fill="#64748b"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Port markers overlay */}
        <div className="absolute inset-4">
          {ports.slice(0, 6).map((port, index) => (
            <div
              key={port.id}
              className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform ${
                port.type === "private" ? "bg-amber-500" : "bg-slate-600"
              }`}
              style={{
                left: `${15 + (index % 3) * 30}%`,
                top: `${30 + Math.floor(index / 3) * 25}%`,
              }}
              onClick={() => setSelectedPort(port)}
              title={port.name}
            />
          ))}
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <Anchor className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">
              Interactive Marina Map
            </h3>
            <p className="text-sm opacity-90 mb-4 max-w-xs">
              Click on the markers to explore our global network of premium
              marinas
            </p>
            <div className="text-xs opacity-75">
              Google Maps API key required for full functionality
            </div>
          </div>
        </div>

        {/* Interactive Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border max-w-xs">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Anchor className="w-4 h-4 mr-2 text-slate-700" />
            Marina Network
          </h4>

          {/* Port types */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-slate-600 rounded-full border border-white shadow-sm"></div>
                <span className="text-xs text-gray-600">Marinas</span>
              </div>
              <span className="text-xs font-medium text-gray-900">
                {ports.filter((p) => p.type === "marina").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full border border-white shadow-sm"></div>
                <span className="text-xs text-gray-600">Private Ports</span>
              </div>
              <span className="text-xs font-medium text-gray-900">
                {ports.filter((p) => p.type === "private").length}
              </span>
            </div>
          </div>

          {/* Interactive port list */}
          <div className="space-y-1 max-h-32 overflow-y-auto">
            <div className="text-xs font-medium text-gray-700 mb-2">
              Featured Locations:
            </div>
            {ports.slice(0, 4).map((port) => (
              <button
                key={port.id}
                onClick={() => setSelectedPort(port)}
                className={`w-full text-left p-2 rounded text-xs hover:bg-gray-50 transition-colors border-l-2 ${
                  selectedPort?.id === port.id
                    ? "bg-gray-50 border-slate-600"
                    : "border-transparent"
                }`}
              >
                <div className="font-medium text-gray-900 truncate">
                  {port.name}
                </div>
                <div className="text-gray-500 flex items-center justify-between">
                  <span
                    className={
                      port.type === "private"
                        ? "text-amber-600"
                        : "text-slate-600"
                    }
                  >
                    {port.type === "private" ? "Private" : "Marina"}
                  </span>
                  <span>${port.pricePerNight}/night</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Port info panel */}
        {selectedPort && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 border max-w-xs">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">
                {selectedPort.name}
              </h4>
              <button
                onClick={() => setSelectedPort(null)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Type:</span>
                <span
                  className={`font-medium ${
                    selectedPort.type === "private"
                      ? "text-amber-600"
                      : "text-slate-600"
                  }`}
                >
                  {selectedPort.type === "private" ? "Private" : "Marina"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="font-medium text-yellow-600">
                  {selectedPort.rating} ⭐
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-gray-900">
                  ${selectedPort.pricePerNight}/night
                </span>
              </div>
            </div>
            <button className="w-full mt-3 bg-slate-700 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors">
              View Details
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center rounded-xl overflow-hidden"
        style={{ height }}
      >
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Loading Map...</h3>
          <p className="text-sm opacity-90">Discovering marinas worldwide</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full" style={{ height }} />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Port Types</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-600 rounded-full border border-white shadow-sm"></div>
            <span className="text-xs text-gray-600">Marinas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full border border-white shadow-sm"></div>
            <span className="text-xs text-gray-600">Private Ports</span>
          </div>
        </div>
      </div>

      {/* Port counter */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border">
        <div className="flex items-center space-x-2">
          <Anchor className="w-4 h-4 text-slate-700" />
          <span className="text-sm font-semibold text-gray-900">
            {ports.length} Ports
          </span>
        </div>
      </div>
    </div>
  );
}
