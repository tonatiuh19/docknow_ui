import { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import InteractivePortMap from "./InteractivePortMap";
import { Port } from "@/types";
import { Search, Calendar, MapPin, Anchor } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        video.play().catch(() => {
          setVideoError(true);
        });
      };

      const handleError = () => {
        setVideoError(true);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <section
      className="relative min-h-screen w-full bg-gradient-to-br from-navy-900 via-ocean-800 to-ocean-700 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          var(--color-navy-900) 0%, 
          var(--color-ocean-800) 35%, 
          var(--color-ocean-700) 70%, 
          var(--color-ocean-600) 100%)`,
      }}
    >
      {/* Background video or fallback */}
      <div className="absolute inset-0">
        {!videoError && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-80" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
          >
            <source
              src="https://garbrix.com/navios/assets/videos/dock_now.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Fallback gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-navy-900 via-ocean-800 to-ocean-700 transition-opacity duration-1000 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: `linear-gradient(135deg, 
              var(--color-navy-900) 0%, 
              var(--color-ocean-800) 35%, 
              var(--color-ocean-700) 70%, 
              var(--color-ocean-600) 100%)`,
          }}
        ></div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-ocean-800/40 to-ocean-700/30 z-10"></div>

        {/* Ocean water texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-80px)] sm:min-h-[80vh]">
          {/* Left side - Content and Search Form */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white block">Find & Reserve</span>
                <span className="text-white block">Boat Docking</span>
                <span className="text-white block">Spaces</span>
                <span className="text-ocean-300 block">Worldwide</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Discover ports, explore facilities, and book your perfect
                docking space from our harbour of marinas around the world.
              </p>
            </div>

            {/* Enhanced Search Form with Glass Effect */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl ring-1 ring-white/20">
              <div className="space-y-4 sm:space-y-6">
                {/* Form Header with Glass Effect */}
                <div className="text-center pb-4 border-b border-white/10">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Find Your Perfect Port
                  </h3>
                  <p className="text-white/70 text-sm">
                    Discover and book premium docking spaces worldwide
                  </p>
                </div>

                {/* Location Input */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Where do you want to dock?"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>

                {/* Date Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type="text"
                      placeholder="Check-in date"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type="text"
                      placeholder="Check-out date"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Additional Options Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-sm appearance-none">
                      <option value="" className="text-gray-900">
                        Boat Length
                      </option>
                      <option value="select" className="text-gray-900">
                        Select boat...
                      </option>
                    </select>
                  </div>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-sm appearance-none">
                      <option value="" className="text-gray-900">
                        Port Type
                      </option>
                      <option value="all" className="text-gray-900">
                        All Ports
                      </option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button className="w-full bg-navy-800 text-white from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group shadow-lg backdrop-blur-sm text-sm sm:text-base">
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Search Available Ports</span>
                </button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
              <div className="text-center sm:text-left">
                <div className="text-white/90 text-sm font-medium mb-1">
                  Island hopping
                </div>
                <div className="text-white/70 text-xs flex items-center justify-center sm:justify-start">
                  <svg
                    className="w-3 h-3 mr-1 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure payments
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-white/90 text-sm font-medium mb-1">
                  24/7 Support
                </div>
                <div className="text-white/70 text-xs flex items-center justify-center sm:justify-start">
                  <svg
                    className="w-3 h-3 mr-1 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 Support
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-white/90 text-sm font-medium mb-1">
                  Flexible cancellation
                </div>
                <div className="text-white/70 text-xs flex items-center justify-center sm:justify-start">
                  <svg
                    className="w-3 h-3 mr-1 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Easy cancellation
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Yacht Visual */}
          <div className="relative flex items-center justify-center"></div>
        </div>
      </div>
    </section>
  );
}
