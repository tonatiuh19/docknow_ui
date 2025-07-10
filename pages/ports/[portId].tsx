import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppSelector } from "@/store";
import {
  MapPin,
  Star,
  Users,
  Wifi,
  Zap,
  Droplets,
  Shield,
  Fuel,
  Coffee,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
} from "lucide-react";

export default function PortDetailPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { portId } = router.query;
  const { ports } = useAppSelector((state) => state.ports);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const port = ports.find((p) => p.id === portId);

  useEffect(() => {
    if (!port && portId && ports.length > 0) {
      router.push("/ports");
    }
  }, [port, portId, ports.length, router]);

  if (!port) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p>{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-5 h-5 text-ocean-600" />;
      case "electricity":
        return <Zap className="w-5 h-5 text-ocean-600" />;
      case "water":
        return <Droplets className="w-5 h-5 text-ocean-600" />;
      case "security":
        return <Shield className="w-5 h-5 text-ocean-600" />;
      case "fuel":
        return <Fuel className="w-5 h-5 text-ocean-600" />;
      case "restaurant":
      case "concierge":
        return <Coffee className="w-5 h-5 text-ocean-600" />;
      default:
        return <Coffee className="w-5 h-5 text-ocean-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/ports"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ports
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={port.images[selectedImageIndex] || port.images[0]}
                  alt={port.name}
                  fill
                  className="object-cover"
                />
              </div>
              {port.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {port.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-20 rounded-lg overflow-hidden ${
                          selectedImageIndex === index
                            ? "ring-2 ring-ocean-500"
                            : ""
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${port.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Port Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {port.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>
                      {port.location.city}, {port.location.country}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium text-gray-900">
                      {port.rating}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({port.reviews.length} reviews)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-ocean-600">
                    ${port.pricePerNight}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {port.description}
              </p>

              {/* Availability */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      Available Spaces
                    </h3>
                    <p className="text-green-700">
                      {port.availableSpaces} of {port.capacity} spaces available
                    </p>
                  </div>
                  <div className="w-20 bg-green-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${
                          (port.availableSpaces / port.capacity) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("ports.amenities")}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {port.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("ports.specifications")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Max Boat Length</span>
                    <span className="font-medium">
                      {port.specifications.maxBoatLength} ft
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Depth</span>
                    <span className="font-medium">
                      {port.specifications.depth} ft
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Total Capacity</span>
                    <span className="font-medium">{port.capacity} boats</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Electricity</span>
                    <span
                      className={`font-medium ${
                        port.specifications.electricity
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {port.specifications.electricity
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Fresh Water</span>
                    <span
                      className={`font-medium ${
                        port.specifications.water
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {port.specifications.water
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">24/7 Security</span>
                    <span
                      className={`font-medium ${
                        port.specifications.security
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {port.specifications.security
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("ports.reviews")}
              </h3>
              {port.reviews.length > 0 ? (
                <div className="space-y-6">
                  {port.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={
                            review.userAvatar ||
                            "https://via.placeholder.com/40"
                          }
                          alt={review.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {review.userName}
                            </h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{review.helpful} found this helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No reviews yet. Be the first to review this marina!
                </p>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-ocean-600 mb-1">
                  ${port.pricePerNight}
                </div>
                <div className="text-gray-500">per night</div>
              </div>

              <Link
                href={`/booking/${port.id}`}
                className="w-full bg-ocean-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-ocean-700 transition-colors flex items-center justify-center mb-4"
              >
                <Users className="w-4 h-4 mr-2" />
                {t("ports.bookNow")}
              </Link>

              <div className="text-center text-sm text-gray-500 mb-6">
                Free cancellation up to 24 hours before check-in
              </div>

              {/* Contact Information */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {t("ports.contact")}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>{port.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span>{port.contact.email}</span>
                  </div>
                  {port.contact.website && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-3" />
                      <a
                        href={port.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-600 hover:text-ocean-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
                <div className="text-sm text-gray-600 mb-4">
                  {port.location.address}
                </div>
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
                  <span className="text-gray-500">Map View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
