import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  fetchUserReservations,
  cancelReservation,
} from "@/store/slices/reservationsSlice";
import { addNotification } from "@/store/slices/uiSlice";
import {
  Calendar,
  MapPin,
  Users,
  Anchor,
  Clock,
  X,
  Filter,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import styles from "./reservations.module.css";

export default function ReservationsPage() {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { reservations, loading } = useAppSelector(
    (state) => state.reservations
  );
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showFilters, setShowFilters] = useState(false);

  // Port information mapping (in a real app, this would come from the ports API)
  const portInfo: Record<
    string,
    { name: string; location: string; image: string }
  > = {
    port_barcelona_001: {
      name: "Marina del Sol",
      location: "Barcelona, Spain",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    },
    port_italy_001: {
      name: "Porto Azzurro",
      location: "Cinque Terre, Italy",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    },
    port_france_001: {
      name: "Port de Cannes",
      location: "Cannes, France",
      image:
        "https://images.unsplash.com/photo-1527004760525-d8e44de5f2e1?w=400&h=300&fit=crop",
    },
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Fetching reservations for user:", user.id);
      dispatch(fetchUserReservations(user.id));
    }
  }, [dispatch, isAuthenticated, user]);

  // Debug logging for reservations
  useEffect(() => {
    console.log("Reservations state:", reservations);
    console.log("Number of reservations:", reservations.length);
  }, [reservations]);

  const handleCancelReservation = async (reservationId: string) => {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await dispatch(cancelReservation(reservationId)).unwrap();
        dispatch(
          addNotification({
            type: "success",
            message: "Reservation cancelled successfully",
          })
        );
      } catch (error) {
        dispatch(
          addNotification({
            type: "error",
            message: "Failed to cancel reservation",
          })
        );
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "M/d/yyyy");
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatPrice = (price: number) => {
    return `€${price}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view your reservations.
          </p>
          <a
            href="/auth/signin"
            className="bg-ocean-600 text-white px-6 py-3 rounded-lg hover:bg-ocean-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-500">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>My Reservations</h1>
            <p className={styles.pageSubtitle}>
              Manage your current and upcoming docking reservations
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentSection}>
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {reservations.length} Reservations
            </h2>
            <p className="text-gray-600 mt-1">
              Keep track of your booking history and upcoming stays
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            <button className="flex items-center space-x-2 px-6 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Reservation</span>
            </button>
          </div>
        </div>

        {/* Reservations List */}
        <div className={styles.reservationsGrid}>
          {reservations.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <Anchor />
              </div>
              <h3 className={styles.emptyStateTitle}>No reservations yet</h3>
              <p className={styles.emptyStateDescription}>
                You haven't made any reservations. Start exploring our marinas!
              </p>
              <a href="/ports" className={styles.emptyStateButton}>
                <Plus className={styles.emptyStateButtonIcon} />
                Browse Marinas
              </a>
            </div>
          ) : (
            reservations.map((reservation) => {
              const port = portInfo[reservation.portId];
              const nights = calculateNights(
                reservation.checkIn,
                reservation.checkOut
              );

              return (
                <div
                  key={reservation.id}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Port Icon */}
                      <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Anchor className="w-6 h-6 text-ocean-600" />
                      </div>

                      {/* Port Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {port?.name || "Unknown Port"}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {port?.location || "Unknown Location"}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                              reservation.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : reservation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : reservation.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {reservation.status.charAt(0).toUpperCase() +
                              reservation.status.slice(1)}
                          </span>
                        </div>

                        {/* Booking Details */}
                        <div className="flex items-center space-x-8 mt-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Check-in</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Check-out</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">Total</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-8 mt-1 text-sm">
                          <div className="text-gray-900">
                            {formatDate(reservation.checkIn)}
                          </div>
                          <div className="text-gray-900">
                            {formatDate(reservation.checkOut)}
                          </div>
                          <div className="font-semibold text-gray-900">
                            {formatPrice(reservation.totalPrice)} ({nights}{" "}
                            nights)
                          </div>
                        </div>

                        {/* Boat Details */}
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="inline-flex items-center">
                            <Anchor className="w-4 h-4 mr-1" />
                            {reservation.boatDetails.name} •{" "}
                            {reservation.boatDetails.type} •{" "}
                            {reservation.boatDetails.length}ft
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4 mt-4">
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            View Details
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            Contact Marina
                          </button>
                          {reservation.status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleCancelReservation(reservation.id)
                              }
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
