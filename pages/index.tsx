import { useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPorts } from "@/store/slices/portsSlice";
import { Search, Calendar, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedPorts from "@/components/FeaturedPorts";
import FeaturedPrivatePorts from "@/components/FeaturedPrivatePorts";
import Features from "@/components/Features";

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

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your perfect port and enjoy a simple booking experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-ocean-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Search & Discover
              </h3>
              <p className="text-gray-600">
                Use our interactive map to find the perfect port and marina for
                your journey
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ocean-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Compare & Select
              </h3>
              <p className="text-gray-600">
                Compare prices and information, view photos, facilities and
                booking availability for different marina locations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ocean-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Book & Confirm
              </h3>
              <p className="text-gray-600">
                Complete your reservation and receive instant confirmation with
                all the booking details
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ports */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Marinas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover premium docking facilities at some of the world's most
              beautiful destinations
            </p>
          </div>
          <FeaturedPorts />
        </div>
      </section>

      {/* Featured Private Ports */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Private Ports to Rent
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience exclusive private docking spaces with personalized
              service and unique amenities
            </p>
          </div>
          <FeaturedPrivatePorts />
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ocean-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Port?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of boaters worldwide and find those unbeatable marina
            amenities
          </p>
          <button
            onClick={() => router.push("/ports")}
            className="bg-white text-ocean-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>
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
