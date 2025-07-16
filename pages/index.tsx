import { useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPorts } from "@/store/slices/portsSlice";
import { Search, Calendar, MapPin } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedPorts from "@/components/FeaturedPorts";
import FeaturedPrivatePorts from "@/components/FeaturedPrivatePorts";
import Features from "@/components/Features";
import ReadyToFindPortCTA from "@/components/ReadyToFindPortCTA";

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
            {/* Left side - Images and Stats */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Top Left - Main yacht image with stat */}
                <div className="relative">
                  <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-ocean-500 to-ocean-700">
                    <img
                      src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Luxury yacht at marina"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Stat overlay */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100">
                    <div className="text-2xl sm:text-3xl font-bold text-navy-800">
                      100+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                      Partner Marinas
                    </div>
                  </div>
                </div>

                {/* Top Right - Yacht from above */}
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-navy-600 to-navy-800 mt-4 sm:mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Yacht aerial view"
                    className="w-full h-full object-cover"
                  />
                  {/* Stat overlay */}
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-ocean-500 text-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold">300+</div>
                    <div className="text-xs opacity-90">Available Berths</div>
                  </div>
                </div>

                {/* Bottom Left - Marina yacht */}
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-ocean-400 to-ocean-600 -mt-4 sm:-mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Yacht at dock"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:pl-8 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 mb-4 sm:mb-6 leading-tight">
                Give Your Yacht a Home, Wherever You Go
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                At Dock Now, we connect yacht owners with the best docking spots
                around the world. Whether it's for a night or an extended stay,
                we give you instant access to premium moorings with just a few
                clicks.
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
      {/* How it Works Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-ocean-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
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
