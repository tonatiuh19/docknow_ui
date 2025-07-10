import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Mock user for development
const mockUser: User = {
  id: "user_123",
  email: "marina.explorer@docknow.com",
  name: "Marina Explorer",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  phone: "+1-555-0199",
  preferences: {
    language: "en",
    currency: "EUR",
  },
  boats: [
    {
      id: "boat_1",
      name: "Sea Breeze",
      type: "Sailboat",
      length: 42,
      width: 12.5,
      draft: 6.2,
      registrationNumber: "SB-2019-042",
      insurance: {
        provider: "Marine Insurance Co",
        policyNumber: "MI-2024-789456",
        expiryDate: "2025-12-31",
      },
    },
  ],
  reservations: [],
};

const initialState: AuthState = {
  user: mockUser,
  isAuthenticated: true,
  loading: false,
  error: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: { email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data
    const mockUser: User = {
      id: "1",
      email: credentials.email,
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      phone: "+1-555-0123",
      preferences: {
        language: "en",
        currency: "USD",
      },
      boats: [],
      reservations: [],
    };

    return mockUser;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: { email: string; password: string; name: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      preferences: {
        language: "en",
        currency: "USD",
      },
      boats: [],
      reservations: [],
    };

    return mockUser;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserPreferences: (
      state,
      action: PayloadAction<Partial<User["preferences"]>>
    ) => {
      if (state.user) {
        state.user.preferences = {
          ...state.user.preferences,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Sign in failed";
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Sign up failed";
      })
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, updateUserPreferences } = authSlice.actions;
export default authSlice.reducer;
