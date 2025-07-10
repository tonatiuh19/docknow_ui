import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import portsReducer from "./slices/portsSlice";
import authReducer from "./slices/authSlice";
import reservationsReducer from "./slices/reservationsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    ports: portsReducer,
    auth: authReducer,
    reservations: reservationsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
