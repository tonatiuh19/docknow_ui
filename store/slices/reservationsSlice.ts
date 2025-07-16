import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../../types";

interface ReservationsState {
  reservations: Reservation[];
  currentReservation: Reservation | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  currentReservation: null,
  loading: false,
  error: null,
};

// Async thunks
export const createReservation = createAsyncThunk(
  "reservations/create",
  async (
    reservationData: Omit<Reservation, "id" | "createdAt" | "updatedAt">
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newReservation: Reservation = {
      ...reservationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newReservation;
  }
);

export const fetchUserReservations = createAsyncThunk(
  "reservations/fetchUserReservations",
  async (userId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock reservations with proper data structure
    const mockReservations: Reservation[] = [
      {
        id: "res_001",
        userId: "user_123",
        portId: "port_barcelona_001",
        spaceId: "space_A12",
        checkIn: "2024-03-14",
        checkOut: "2024-03-17",
        totalPrice: 135,
        status: "confirmed",
        guestCount: 2,
        boatDetails: {
          name: "Sea Breeze",
          length: 42,
          width: 12.5,
          type: "Sailboat",
        },
        paymentStatus: "paid",
        createdAt: "2024-02-15T10:30:00Z",
        updatedAt: "2024-02-15T10:30:00Z",
      },
      {
        id: "res_002",
        userId: "user_123",
        portId: "port_italy_001",
        spaceId: "space_B07",
        checkIn: "2024-04-19",
        checkOut: "2024-04-21",
        totalPrice: 76,
        status: "pending",
        guestCount: 2,
        boatDetails: {
          name: "Sea Breeze",
          length: 42,
          width: 12.5,
          type: "Sailboat",
        },
        paymentStatus: "pending",
        createdAt: "2024-03-10T14:22:00Z",
        updatedAt: "2024-03-10T14:22:00Z",
      },
      {
        id: "res_003",
        userId: "user_123",
        portId: "port_france_001",
        spaceId: "space_C15",
        checkIn: "2024-05-08",
        checkOut: "2024-05-12",
        totalPrice: 320,
        status: "confirmed",
        guestCount: 4,
        boatDetails: {
          name: "Sea Breeze",
          length: 42,
          width: 12.5,
          type: "Sailboat",
        },
        paymentStatus: "paid",
        createdAt: "2024-03-01T09:15:00Z",
        updatedAt: "2024-03-01T09:15:00Z",
      },
    ];

    return mockReservations;
  }
);

export const cancelReservation = createAsyncThunk(
  "reservations/cancel",
  async (reservationId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return reservationId;
  }
);

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setCurrentReservation: (
      state,
      action: PayloadAction<Reservation | null>
    ) => {
      state.currentReservation = action.payload;
    },
    clearReservations: (state) => {
      state.reservations = [];
      state.currentReservation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Reservation
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
        state.currentReservation = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create reservation";
      })
      // Fetch User Reservations
      .addCase(fetchUserReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reservations";
      })
      // Cancel Reservation
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.map((reservation) =>
          reservation.id === action.payload
            ? { ...reservation, status: "cancelled" as const }
            : reservation
        );
      });
  },
});

export const { setCurrentReservation, clearReservations } =
  reservationsSlice.actions;
export default reservationsSlice.reducer;
