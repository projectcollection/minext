import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/app/appSlice";

export const store = configureStore({
  reducer: {
    app: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
