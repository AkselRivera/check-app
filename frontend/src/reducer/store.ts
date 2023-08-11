import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ui from "./ui";

export const store = configureStore({
  reducer: {
    ui: ui,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
