import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import InteractivePortMap from "./InteractivePortMap";
import { Port } from "@/types";

export default function Hero() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Search Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Find & Reserve
                <br />
                <span className="text-ocean-600">Boat Docking</span>
                <br />
                <span className="text-gray-700">Spaces</span>
                <br />
                <span className="text-gray-900">Worldwide</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Discover ports, explore facilities, and book your perfect
                docking space from our harbour of marinas around the world.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <SearchBar fullWidth={true} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Island hopping</div>
                <div className="text-xs text-ocean-600">✓ Secure payments</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">24/7 Support</div>
                <div className="text-xs text-ocean-600">✓ 24/7 Support</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">
                  Flexible cancellation
                </div>
                <div className="text-xs text-ocean-600">
                  ✓ Easy cancellation
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive Map */}
          <div className="h-[500px] lg:h-[600px]">
            <div className="w-full h-full relative">
              <InteractivePortMap
                selectedPort={selectedPort}
                onPortHover={setSelectedPort}
              />

              {/* Map overlay with info */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="text-sm font-medium text-gray-900">
                  Interactive Port Map
                </div>
                <div className="text-xs text-gray-600">
                  Hover over pins to explore
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
