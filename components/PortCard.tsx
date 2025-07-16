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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative h-64">
        <img
          src={port.images[0] || "https://via.placeholder.com/400x300"}
          alt={port.name}
          className="w-full h-full object-cover"
        />
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-bold text-navy-800 shadow-md">
          ${port.pricePerNight}/per night
        </div>
        {port.portType === "private_port" && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-1 shadow-md">
            <Home className="w-3 h-3" />
            <span>Private</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-navy-800 mb-2">{port.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {port.location.city}, {port.location.country}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-semibold text-gray-900">
              {port.rating}
            </span>
            <span className="ml-1 text-sm text-gray-500">
              ({port.reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {port.description}
        </p>

        {/* Amenities */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          {port.amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 text-gray-600 text-xs"
            >
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {port.amenities.length > 4 && (
            <span className="text-xs text-gray-400">
              +{port.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-600 font-medium">
            {port.availableSpaces} of {port.capacity} spaces available
          </span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-ocean-500 h-2 rounded-full transition-all duration-300"
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
            className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-xl text-center font-semibold hover:bg-gray-200 transition-all duration-300 text-sm"
          >
            View Details
          </Link>
          <Link
            href={`/booking/${port.id}`}
            className="flex-1 bg-navy-800 text-white px-4 py-3 rounded-xl text-center font-semibold hover:bg-navy-900 transition-all duration-300 text-sm shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
