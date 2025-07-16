import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearchFilters, clearFilters } from "@/store/slices/portsSlice";
import { SearchFilters } from "@/types";
import {
  Sliders,
  RotateCcw,
  Wifi,
  Zap,
  Droplets,
  Shield,
  Fuel,
  Coffee,
} from "lucide-react";

export default function PortFilters() {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { searchFilters } = useAppSelector((state) => state.ports);

  const [localFilters, setLocalFilters] =
    useState<SearchFilters>(searchFilters);

  const amenitiesList = [
    { key: "WiFi", icon: <Wifi className="w-4 h-4" />, label: "WiFi" },
    {
      key: "Electricity",
      icon: <Zap className="w-4 h-4" />,
      label: "Electricity",
    },
    { key: "Water", icon: <Droplets className="w-4 h-4" />, label: "Water" },
    {
      key: "Security",
      icon: <Shield className="w-4 h-4" />,
      label: "Security",
    },
    { key: "Fuel", icon: <Fuel className="w-4 h-4" />, label: "Fuel" },
    {
      key: "Restaurant",
      icon: <Coffee className="w-4 h-4" />,
      label: "Restaurant",
    },
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    dispatch(setSearchFilters(newFilters));
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];

    handleFilterChange("amenities", newAmenities);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t("filters.title")}
          </h3>
        </div>
        <button
          onClick={handleClearFilters}
          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t("filters.clearAll")}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {t("filters.priceRange")}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t("filters.minPrice")}
              </label>
              <input
                type="number"
                placeholder="$0"
                value={localFilters.minPrice || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "minPrice",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-ocean-500 focus:border-ocean-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t("filters.maxPrice")}
              </label>
              <input
                type="number"
                placeholder="$500"
                value={localFilters.maxPrice || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "maxPrice",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-ocean-500 focus:border-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* Boat Length */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Boat Length (ft)
          </h4>
          <input
            type="number"
            placeholder="e.g. 40"
            value={localFilters.boatLength || ""}
            onChange={(e) =>
              handleFilterChange(
                "boatLength",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-ocean-500 focus:border-ocean-500"
          />
        </div>

        {/* Port Type */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Port Type</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="portType"
                value="all"
                checked={
                  !localFilters.portType || localFilters.portType === "all"
                }
                onChange={(e) => handleFilterChange("portType", "all")}
                className="w-4 h-4 text-ocean-600 focus:ring-ocean-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">All Ports</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="portType"
                value="marina"
                checked={localFilters.portType === "marina"}
                onChange={(e) => handleFilterChange("portType", "marina")}
                className="w-4 h-4 text-ocean-600 focus:ring-ocean-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Public Marinas</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="portType"
                value="private_port"
                checked={localFilters.portType === "private_port"}
                onChange={(e) => handleFilterChange("portType", "private_port")}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Private Ports</span>
            </label>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {t("filters.rating")}
          </h4>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={localFilters.rating === rating}
                  onChange={(e) =>
                    handleFilterChange("rating", parseFloat(e.target.value))
                  }
                  className="mr-2 text-ocean-600 focus:ring-ocean-500"
                />
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">{rating}+</span>
                  <div className="flex ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xs ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {t("filters.amenities")}
          </h4>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.amenities || []).includes(amenity.key)}
                  onChange={() => handleAmenityToggle(amenity.key)}
                  className="mr-3 text-ocean-600 focus:ring-ocean-500 rounded"
                />
                <div className="flex items-center space-x-2">
                  {amenity.icon}
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
