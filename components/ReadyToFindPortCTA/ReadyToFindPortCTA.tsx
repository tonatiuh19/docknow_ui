import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function ReadyToFindPortCTA() {
  const router = useRouter();

  // Video state management
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
    <section className="relative py-32 overflow-hidden">
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
              src="https://garbrix.com/navios/assets/videos/doc_now_last.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Fallback gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-ocean-800 transition-opacity duration-1000 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-navy-800/40 to-ocean-800/30 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Find Your Perfect Port?
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of boaters worldwide and find those unbeatable marina
          amenities
        </p>

        <button
          onClick={() => router.push("/ports")}
          className="bg-white text-navy-800 px-12 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1 flex items-center mx-auto"
        >
          Get Started
          <svg
            className="w-6 h-6 ml-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
