import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/taskSlice";
import userSlice from "./features/userSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    todo: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
