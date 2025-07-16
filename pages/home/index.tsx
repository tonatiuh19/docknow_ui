import { useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPorts } from "@/store/slices/portsSlice";
import { Search, Calendar, MapPin } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import Hero from "@/components/Hero/Hero";
import SearchBar from "@/components/SearchBar/SearchBar";
import FeaturedPorts from "@/components/FeaturedPorts/FeaturedPorts";
import FeaturedPrivatePorts from "@/components/FeaturedPrivatePorts/FeaturedPrivatePorts";
import Features from "@/components/Features/Features";
import ReadyToFindPortCTA from "@/components/ReadyToFindPortCTA/ReadyToFindPortCTA";
import GoogleMap from "@/components/GoogleMap/GoogleMap";

export default function Home() {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { ports, loading } = useAppSelector((state) => state.ports);

  useEffect(() => {
    if (ports.length === 0) {
      dispatch(fetchPorts());
    }
  }, [dispatch, ports.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with integrated search */}
      <Hero />
      {/* Yacht Home Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left side - Interactive Map with Stats */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Main Map Container */}
                <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-ocean-500 to-ocean-700 shadow-2xl">
                  <GoogleMap height="100%" />
                </div>

                {/* Stats Overlays */}
                {/* Partner Marinas Stat */}
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                  <div className="text-2xl sm:text-3xl font-bold text-navy-800">
                    100+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    Partner Marinas
                  </div>
                </div>

                {/* Available Berths Stat */}
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-ocean-500 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl z-10">
                  <div className="text-xl sm:text-2xl font-bold">300+</div>
                  <div className="text-xs opacity-90">Available Berths</div>
                </div>

                {/* Global Coverage Stat */}
                <div className="absolute top-1/2 -right-2 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-xl border border-gray-100 z-10 transform -translate-y-1/2">
                  <div className="text-lg sm:text-xl font-bold text-navy-800">
                    50+
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Countries
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:pl-8 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 mb-4 sm:mb-6 leading-tight">
                Discover Marinas Worldwide
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                At Dock Now, we connect yacht owners with premium docking spots
                across the globe. Our interactive platform gives you instant
                access to verified marinas in over 50 countries, making it easy
                to find the perfect berth wherever your journey takes you.
              </p>

              {/* Features list */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-4">
                    <FaCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-base sm:text-lg text-gray-700">
                    Verified and secure marinas
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-4">
                    <FaCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-base sm:text-lg text-gray-700">
                    Premium and budget-friendly options
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-4">
                    <FaCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-base sm:text-lg text-gray-700">
                    Fast, 100% digital process
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => router.push("/ports")}
                className="bg-navy-800 text-white px-6 sm:px-8 py-3 rounded-md font-semibold text-base sm:text-lg hover:bg-navy-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 flex items-center mx-auto lg:mx-0"
              >
                Get Started
                <svg
                  className="w-5 h-5 ml-2"
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
          </div>
        </div>
      </section>
      {/* Download App Section */}
      <section className="py-16 sm:py-20 bg-ocean-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4 sm:mb-6">
              Take Dock Now With You
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Download our mobile app and book marinas on the go. Available for
              iOS and Android devices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* App Store Button */}
              <a
                href="#"
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1"
              >
                <svg
                  className="w-8 h-8 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="#"
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1"
              >
                <svg
                  className="w-8 h-8 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Additional features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">
                  Book on the Go
                </h3>
                <p className="text-gray-600">
                  Find and reserve marina spots from anywhere
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">
                  GPS Navigation
                </h3>
                <p className="text-gray-600">
                  Get turn-by-turn directions to your marina
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4 19l5-5 5 5M4 19h11"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">
                  Push Notifications
                </h3>
                <p className="text-gray-600">
                  Get real-time updates on your reservations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-br from-navy-900 via-navy-800 to-ocean-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-ocean-100 max-w-3xl mx-auto leading-relaxed">
              Book your perfect port and enjoy a simple booking experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-navy-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                Search & Discover
              </h3>
              <p className="text-ocean-100 leading-relaxed text-sm sm:text-base">
                Use our interactive map to find the perfect port and marina for
                your journey
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-navy-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                Compare & Select
              </h3>
              <p className="text-ocean-100 leading-relaxed text-sm sm:text-base">
                Compare prices and information, view photos, facilities and
                booking availability for different marina locations
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-navy-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                Book & Confirm
              </h3>
              <p className="text-ocean-100 leading-relaxed text-sm sm:text-base">
                Complete your reservation and receive instant confirmation with
                all the booking details
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Ports */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 sm:mb-16">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3 sm:mb-4">
                Featured Marinas
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                Discover premium docking facilities at some of the world's most
                beautiful destinations
              </p>
            </div>
            <button
              onClick={() => router.push("/ports")}
              className="bg-navy-800 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-navy-900 transition-all duration-300 shadow-lg flex items-center mx-auto lg:mx-0 text-sm sm:text-base"
            >
              View All Marinas
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
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
          <FeaturedPorts />
        </div>
      </section>
      {/* Featured Private Ports */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 sm:mb-16">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3 sm:mb-4">
                Private Ports to Rent
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                Experience exclusive private docking spaces with personalized
                service and unique amenities
              </p>
            </div>
            <button
              onClick={() => router.push("/ports")}
              className="bg-navy-800 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-navy-900 transition-all duration-300 shadow-lg flex items-center mx-auto lg:mx-0 text-sm sm:text-base"
            >
              View All Private Ports
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
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
          <FeaturedPrivatePorts />
        </div>
      </section>
      {/* Features Section */}
      <Features /> {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-ocean-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Dock Now?
            </h2>
            <p className="text-xl text-ocean-100 max-w-3xl mx-auto leading-relaxed">
              Everything you need to book the perfect marina space worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <svg
                  className="w-10 h-10 text-navy-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Verified Marinas
              </h3>
              <p className="text-ocean-100 leading-relaxed">
                All marinas are verified and quality-checked for your safety and
                peace of mind
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <svg
                  className="w-10 h-10 text-navy-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Secure Booking
              </h3>
              <p className="text-ocean-100 leading-relaxed">
                Safe and secure payment processing with instant confirmation
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <svg
                  className="w-10 h-10 text-navy-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25A9.75 9.75 0 002.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75A9.75 9.75 0 0012 2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                24/7 Support
              </h3>
              <p className="text-ocean-100 leading-relaxed">
                Round-the-clock customer support whenever you need assistance
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push("/ports")}
              className="bg-white text-navy-800 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-1"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
      {/* Ready to Find Your Perfect Port Section */}
      <ReadyToFindPortCTA />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
