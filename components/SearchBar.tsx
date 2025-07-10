import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store";
import { setSearchFilters } from "@/store/slices/portsSlice";
import { Search, MapPin, Calendar, Users, Ruler } from "lucide-react";

interface SearchBarProps {
  compact?: boolean;
  fullWidth?: boolean;
}

export default function SearchBar({
  compact = false,
  fullWidth = false,
}: SearchBarProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    boatLength: "",
    portType: "all", // all, marina, private_port
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert search data to filters
    const filters = {
      location: searchData.location,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      boatLength: searchData.boatLength
        ? parseFloat(searchData.boatLength)
        : undefined,
    };

    dispatch(setSearchFilters(filters));
    router.push("/ports");
  };

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border ${
        compact ? "p-4" : "p-6"
      } ${fullWidth ? "p-6" : ""}`}
    >
      <form onSubmit={handleSearch}>
        {compact ? (
          // Compact version for hero section
          <div className="space-y-4">
            {/* Location */}
            <div>
              <input
                type="text"
                placeholder="Where do you want to dock?"
                value={searchData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={searchData.checkIn}
                onChange={(e) => handleInputChange("checkIn", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm"
              />
              <input
                type="date"
                value={searchData.checkOut}
                onChange={(e) => handleInputChange("checkOut", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-ocean-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-ocean-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search Ports</span>
            </button>
          </div>
        ) : fullWidth ? (
          // Full width version for hero section
          <div className="space-y-4">
            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="Search ports..."
                value={searchData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Check-in
                </label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Check-out
                </label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Boat Length and Port Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Boat Length
                </label>
                <input
                  type="text"
                  placeholder="Select boat..."
                  value={searchData.boatLength}
                  onChange={(e) =>
                    handleInputChange("boatLength", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Port Type
                </label>
                <select
                  value={searchData.portType}
                  onChange={(e) =>
                    handleInputChange("portType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                >
                  <option value="all">All Ports</option>
                  <option value="marina">Public Marinas</option>
                  <option value="private_port">Private Ports</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-ocean-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-ocean-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search Ports</span>
            </button>
          </div>
        ) : (
          // Original full version
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder={t("home.searchPlaceholder")}
                  value={searchData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {t("home.checkIn")}
                </label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {t("home.checkOut")}
                </label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-ocean-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-ocean-700 transition-colors btn-hover flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>{t("common.search")}</span>
                </button>
              </div>
            </div>

            {/* Additional Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  {t("home.guests")}
                </label>
                <select
                  value={searchData.guests}
                  onChange={(e) =>
                    handleInputChange("guests", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Boat Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  {t("home.boatLength")}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 40"
                  value={searchData.boatLength}
                  onChange={(e) =>
                    handleInputChange("boatLength", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>

              {/* Placeholder for future filter */}
              <div className="hidden md:block"></div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
