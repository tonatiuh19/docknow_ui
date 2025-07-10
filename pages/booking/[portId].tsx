import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppSelector, useAppDispatch } from "@/store";
import { createReservation } from "@/store/slices/reservationsSlice";
import { addNotification } from "@/store/slices/uiSlice";
import {
  Calendar,
  Users,
  Anchor,
  CreditCard,
  MapPin,
  Star,
} from "lucide-react";

export default function BookingPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { portId } = router.query;
  const { ports } = useAppSelector((state) => state.ports);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.reservations);

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    boatDetails: {
      name: "",
      type: "Sailboat",
      length: "",
      width: "",
    },
    guestInfo: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const port = ports.find((p) => p.id === portId);

  useEffect(() => {
    if (!port && portId) {
      router.push("/ports");
    }
  }, [port, portId, router]);

  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        guestInfo: {
          name: user.name,
          email: user.email,
          phone: user.phone || "",
        },
      }));
    }
  }, [user]);

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

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * port.pricePerNight;
    const taxes = subtotal * 0.1; // 10% tax
    return {
      nights,
      subtotal,
      taxes,
      total: subtotal + taxes,
    };
  };

  const handleInputChange = (
    section: string,
    field: string,
    value: string | number
  ) => {
    setBookingData((prev) => {
      if (section === "boatDetails") {
        return {
          ...prev,
          boatDetails: {
            ...prev.boatDetails,
            [field]: value,
          },
        };
      } else if (section === "guestInfo") {
        return {
          ...prev,
          guestInfo: {
            ...prev.guestInfo,
            [field]: value,
          },
        };
      }
      return prev;
    });
  };

  const handleBasicInputChange = (field: string, value: string | number) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    const { total } = calculateTotal();

    const reservationData = {
      userId: user!.id,
      portId: port.id,
      spaceId: "1", // This would come from space selection
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      totalPrice: total,
      status: "pending" as const,
      guestCount: bookingData.guests,
      boatDetails: {
        name: bookingData.boatDetails.name,
        length: parseFloat(bookingData.boatDetails.length),
        width: parseFloat(bookingData.boatDetails.width),
        type: bookingData.boatDetails.type,
      },
      paymentStatus: "pending" as const,
    };

    try {
      await dispatch(createReservation(reservationData)).unwrap();
      dispatch(
        addNotification({
          type: "success",
          message: "Booking confirmed successfully!",
        })
      );
      router.push("/reservations");
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to create booking. Please try again.",
        })
      );
    }
  };

  const pricing = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={port.images[0]}
              alt={port.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{port.name}</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {port.location.city}, {port.location.country}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">
                  {port.rating} ({port.reviews.length} reviews)
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-ocean-600">
                ${port.pricePerNight}
              </p>
              <p className="text-sm text-gray-500">per night</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep
                          ? "bg-ocean-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-16 h-1 mx-2 ${
                          step < currentStep ? "bg-ocean-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Dates & Guests */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Select Dates & Guests
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) =>
                          handleBasicInputChange("checkIn", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) =>
                          handleBasicInputChange("checkOut", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Number of Guests
                    </label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) =>
                        handleBasicInputChange(
                          "guests",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Boat Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Boat Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Anchor className="w-4 h-4 inline mr-1" />
                        Boat Name
                      </label>
                      <input
                        type="text"
                        value={bookingData.boatDetails.name}
                        onChange={(e) =>
                          handleInputChange(
                            "boatDetails",
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="Enter boat name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Boat Type
                      </label>
                      <select
                        value={bookingData.boatDetails.type}
                        onChange={(e) =>
                          handleInputChange(
                            "boatDetails",
                            "type",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      >
                        <option value="Sailboat">Sailboat</option>
                        <option value="Motor Yacht">Motor Yacht</option>
                        <option value="Catamaran">Catamaran</option>
                        <option value="Fishing Boat">Fishing Boat</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length (ft)
                      </label>
                      <input
                        type="number"
                        value={bookingData.boatDetails.length}
                        onChange={(e) =>
                          handleInputChange(
                            "boatDetails",
                            "length",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="e.g. 40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Width (ft)
                      </label>
                      <input
                        type="number"
                        value={bookingData.boatDetails.width}
                        onChange={(e) =>
                          handleInputChange(
                            "boatDetails",
                            "width",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="e.g. 12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Guest Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={bookingData.guestInfo.name}
                        onChange={(e) =>
                          handleInputChange("guestInfo", "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={bookingData.guestInfo.email}
                        onChange={(e) =>
                          handleInputChange(
                            "guestInfo",
                            "email",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bookingData.guestInfo.phone}
                      onChange={(e) =>
                        handleInputChange("guestInfo", "phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CreditCard className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">
                          Payment Information
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          For demo purposes, clicking "Confirm Booking" will
                          simulate a successful payment. In a real application,
                          this would integrate with Stripe or another payment
                          processor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="px-6 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span>{bookingData.checkIn || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span>{bookingData.checkOut || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span>{bookingData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nights:</span>
                  <span>{pricing.nights}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    ${port.pricePerNight} × {pricing.nights} nights
                  </span>
                  <span>${pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>${pricing.taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${pricing.total.toFixed(2)}</span>
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
