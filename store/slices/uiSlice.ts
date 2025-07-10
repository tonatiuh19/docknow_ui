import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  language: "en" | "fr" | "es";
  currency: string;
  sidebarOpen: boolean;
  mapView: "satellite" | "street";
  showFilters: boolean;
  loading: {
    global: boolean;
    search: boolean;
    booking: boolean;
  };
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  language: "en",
  currency: "USD",
  sidebarOpen: false,
  mapView: "satellite",
  showFilters: false,
  loading: {
    global: false,
    search: false,
    booking: false,
  },
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "fr" | "es">) => {
      state.language = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setMapView: (state, action: PayloadAction<"satellite" | "street">) => {
      state.mapView = action.payload;
    },
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    setShowFilters: (state, action: PayloadAction<boolean>) => {
      state.showFilters = action.payload;
    },
    setLoading: (
      state,
      action: PayloadAction<{ key: keyof UIState["loading"]; value: boolean }>
    ) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    addNotification: (
      state,
      action: PayloadAction<
        Omit<UIState["notifications"][0], "id" | "timestamp">
      >
    ) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setLanguage,
  setCurrency,
  toggleSidebar,
  setSidebarOpen,
  setMapView,
  toggleFilters,
  setShowFilters,
  setLoading,
  addNotification,
  removeNotification,
  clearAllNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
