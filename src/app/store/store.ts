import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import timeEntriesReducer from "../features/TimeEntries/store/slice";
import settingsReducer from "../features/Settings/slice";

const preloadedState = loadState();

export const storeReducers = {
  timeEntries: timeEntriesReducer,
  settings: settingsReducer,
};

export const store = configureStore({
  reducer: storeReducers,
  preloadedState,
});

store.subscribe(() => {
  saveState({
    timeEntries: store.getState().timeEntries,
    settings: store.getState().settings,
  });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
