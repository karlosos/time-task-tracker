import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { settings } from "../features/Settings/slice";
import { timeEntries } from "../features/TimeEntries/store/slice";
import { shiftTimer } from "../features/Timer/slice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const storeReducers = {
  timeEntries: timeEntries.reducer,
  settings: settings.reducer,
  shiftTimer: shiftTimer.reducer,
};

export const store = configureStore({
  reducer: storeReducers,
  preloadedState,
});

store.subscribe(() => {
  saveState({
    timeEntries: store.getState().timeEntries,
    settings: store.getState().settings,
    shiftTimer: store.getState().shiftTimer,
  });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<
  ExtraArgumentsType = any,
  ReturnThunkActionType = void,
> = ThunkAction<
  ReturnThunkActionType,
  RootState,
  ExtraArgumentsType,
  Action<string>
>;
