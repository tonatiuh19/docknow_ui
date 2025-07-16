import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPorts } from "@/store/slices/portsSlice";
import PortsList from "@/components/PortsList/PortsList";
import PortsMap from "@/components/PortsMap/PortsMap";
import PortFilters from "@/components/PortFilters/PortFilters";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Filter, Map, List, Search, SlidersHorizontal } from "lucide-react";
import styles from "./ports.module.css";

export default function PortsPage() {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { filteredPorts, loading, searchFilters } = useAppSelector(
    (state) => state.ports
  );
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    dispatch(fetchPorts(searchFilters));
  }, [dispatch, searchFilters]);

  return (
    <div className={styles.portsContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Discover Ports Worldwide</h1>
            <p className={styles.pageSubtitle}>
              Find the perfect docking space for your vessel from thousands of
              verified ports and marinas around the globe.
            </p>
          </div>

          {/* Hero-style Glass Search Form */}
          <div className={styles.searchFormContainer}>
            <div className={styles.searchForm}>
              <div className={styles.searchInputContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search ports by name, location, or facilities..."
                  className={styles.searchInput}
                />
              </div>
              <button className={styles.searchButton}>Search Ports</button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controlsSection}>
        <div className={styles.controlsContainer}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              {/* Results Count */}
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredPorts.length}
                </span>{" "}
                ports found
              </p>

              {/* Quick Filters */}
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                  All Countries
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                  All Prices
                </button>
              </div>
            </div>

            <div className="mt-3 sm:mt-0 flex items-center space-x-3">
              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters
                    ? "bg-ocean-50 border-ocean-500 text-ocean-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>More Filters</span>
              </button>

              {/* Sort */}
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent">
                <option>By Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Distance</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                    viewMode === "map"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Map className="w-4 h-4" />
                  <span className="text-sm">Map</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <PortFilters />
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="spinner mx-auto mb-4"></div>
                  <p className="text-gray-500">{t("common.loading")}</p>
                </div>
              </div>
            ) : filteredPorts.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("ports.noResults")}
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <>
                {viewMode === "list" ? (
                  <PortsList ports={filteredPorts} />
                ) : (
                  <div className="flex gap-6">
                    {/* Interactive Map */}
                    <div className="flex-1">
                      <div className="sticky top-6">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
                          <div className="p-4 border-b bg-gray-50">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900">
                                Interactive Port Map
                              </h3>
                              <p className="text-sm text-gray-600">
                                Explore ports visually
                              </p>
                            </div>
                          </div>
                          <div className="h-full">
                            <PortsMap ports={filteredPorts} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ports List */}
                    <div className="w-96 flex-shrink-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            Found {filteredPorts.length} ports
                          </h3>
                          <p className="text-sm text-gray-600">By Rating</p>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                          {filteredPorts.map((port) => (
                            <div
                              key={port.id}
                              className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start space-x-4">
                                <img
                                  src={
                                    port.images[0] ||
                                    "https://via.placeholder.com/80x60"
                                  }
                                  alt={port.name}
                                  className="w-20 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                                        {port.name}
                                      </h4>
                                      <p className="text-xs text-gray-500">
                                        {port.location.city},{" "}
                                        {port.location.country}
                                      </p>
                                      <div className="flex items-center space-x-1 mt-1">
                                        <span className="text-xs font-medium text-gray-900">
                                          {port.rating}
                                        </span>
                                        <div className="flex text-yellow-400">
                                          {"★".repeat(Math.floor(port.rating))}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          ({port.reviews.length})
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-semibold text-gray-900">
                                        ${port.pricePerNight}/night
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {port.portType === "private_port"
                                          ? "Private"
                                          : "Marina"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-3">
                                    <div className="flex space-x-1">
                                      {port.specifications.wifi && (
                                        <span className="text-xs text-gray-400">
                                          📶
                                        </span>
                                      )}
                                      {port.specifications.electricity && (
                                        <span className="text-xs text-gray-400">
                                          ⚡
                                        </span>
                                      )}
                                      {port.specifications.water && (
                                        <span className="text-xs text-gray-400">
                                          💧
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex space-x-2">
                                      <span className="text-xs text-green-600 font-medium">
                                        {port.availableSpaces > 0
                                          ? "Available"
                                          : "Limited"}
                                      </span>
                                      <button className="bg-ocean-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-ocean-700">
                                        Reserve
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-center pt-4">
                          <button className="text-ocean-600 text-sm font-medium hover:underline">
                            Load More Ports
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
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
