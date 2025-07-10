import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Port } from "@/types";
import { MapPin, Star, Wifi, Zap, Droplets, Shield, Home } from "lucide-react";

interface PortCardProps {
  port: Port;
}

export default function PortCard({ port }: PortCardProps) {
  const { t } = useTranslation("common");

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "electricity":
        return <Zap className="w-4 h-4" />;
      case "water":
        return <Droplets className="w-4 h-4" />;
      case "security":
        return <Shield className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={port.images[0] || "https://via.placeholder.com/400x300"}
          alt={port.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
          ${port.pricePerNight}/{t("ports.pricePerNight")}
        </div>
        {port.portType === "private_port" && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Home className="w-3 h-3" />
            <span>Private</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {port.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {port.location.city}, {port.location.country}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-900">
            {port.rating}
          </span>
          <span className="ml-1 text-sm text-gray-500">
            ({port.reviews.length} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {port.description}
        </p>

        {/* Amenities */}
        <div className="flex items-center space-x-2 mb-4">
          {port.amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 text-gray-500"
            >
              {getAmenityIcon(amenity)}
              <span className="text-xs">{amenity}</span>
            </div>
          ))}
          {port.amenities.length > 4 && (
            <span className="text-xs text-gray-400">
              +{port.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            {port.availableSpaces} of {port.capacity} spaces available
          </span>
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${(port.availableSpaces / port.capacity) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`/ports/${port.id}`}
            className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
          >
            {t("ports.viewDetails")}
          </Link>
          <Link
            href={`/booking/${port.id}`}
            className="flex-1 bg-ocean-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-ocean-700 transition-colors"
          >
            {t("ports.bookNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}
