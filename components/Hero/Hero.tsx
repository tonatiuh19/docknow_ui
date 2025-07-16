import { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar";
import InteractivePortMap from "../InteractivePortMap";
import { Port } from "@/types";
import { Search, Calendar, MapPin, Anchor } from "lucide-react";
import styles from "./Hero.module.css";

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
    <section className={styles.heroSection}>
      {/* Background video or fallback */}
      <div className={styles.backgroundContainer}>
        {!videoError && (
          <video
            ref={videoRef}
            className={`${styles.backgroundVideo} ${
              videoLoaded ? styles.videoLoaded : styles.videoNotLoaded
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
          className={`${styles.fallbackBackground} ${
            videoLoaded && !videoError
              ? styles.fallbackHidden
              : styles.fallbackVisible
          }`}
        ></div>

        {/* Overlay for better text readability */}
        <div className={styles.overlay}></div>

        {/* Ocean water texture overlay */}
        <div className={styles.textureOverlay}></div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.gridLayout}>
          {/* Left side - Content and Search Form */}
          <div className={styles.contentSide}>
            {/* Main Heading */}
            <div className={styles.headingContainer}>
              <h1 className={styles.mainHeading}>
                <span className={styles.headingPrimary}>Find & Reserve</span>
                <span className={styles.headingPrimary}>Boat Docking</span>
                <span className={styles.headingPrimary}>Spaces</span>
                <span className={styles.headingAccent}>Worldwide</span>
              </h1>
              <p className={styles.subHeading}>
                Discover ports, explore facilities, and book your perfect
                docking space from our harbour of marinas around the world.
              </p>
            </div>

            {/* Enhanced Search Form with Glass Effect */}
            <div className={styles.searchForm}>
              <div className={styles.formContainer}>
                {/* Form Header with Glass Effect */}
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Find Your Perfect Port</h3>
                  <p className={styles.formSubtitle}>
                    Discover and book premium docking spaces worldwide
                  </p>
                </div>

                {/* Location Input */}
                <div className={styles.inputGroup}>
                  <MapPin className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Where do you want to dock?"
                    className={styles.input}
                  />
                </div>

                {/* Date Inputs Row */}
                <div className={styles.dateGrid}>
                  <div className={styles.inputGroup}>
                    <Calendar
                      className={`${styles.inputIcon} ${styles.inputSmallIcon}`}
                    />
                    <input
                      type="text"
                      placeholder="Check-in date"
                      className={styles.inputSmall}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <Calendar
                      className={`${styles.inputIcon} ${styles.inputSmallIcon}`}
                    />
                    <input
                      type="text"
                      placeholder="Check-out date"
                      className={styles.inputSmall}
                    />
                  </div>
                </div>

                {/* Additional Options Row */}
                <div className={styles.optionsGrid}>
                  <div className={styles.inputGroup}>
                    <select className={styles.select}>
                      <option value="" className={styles.selectOption}>
                        Boat Length
                      </option>
                      <option value="select" className={styles.selectOption}>
                        Select boat...
                      </option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <select className={styles.select}>
                      <option value="" className={styles.selectOption}>
                        Port Type
                      </option>
                      <option value="all" className={styles.selectOption}>
                        All Ports
                      </option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button className={styles.searchButton}>
                  <Search className={styles.searchIcon} />
                  <span>Search Available Ports</span>
                </button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <div className={styles.trustTitle}>Island hopping</div>
                <div className={styles.trustDescription}>
                  <svg className={styles.checkIcon} viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure payments
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustTitle}>24/7 Support</div>
                <div className={styles.trustDescription}>
                  <svg className={styles.checkIcon} viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 Support
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustTitle}>Flexible cancellation</div>
                <div className={styles.trustDescription}>
                  <svg className={styles.checkIcon} viewBox="0 0 20 20">
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
          <div className={styles.visualSide}></div>
        </div>
      </div>
    </section>
  );
}
