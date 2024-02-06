import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import { timeEntries } from "../features/TimeEntries/store/slice";
import { settings } from "../features/Settings/slice";

const preloadedState = loadState();

export const storeReducers = {
  timeEntries: timeEntries.reducer,
  settings: settings.reducer,
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
export type AppThunk<
  ExtraArgumentsType = any,
  ReturnThunkActionType = void,
> = ThunkAction<
  ReturnThunkActionType,
  RootState,
  ExtraArgumentsType,
  Action<string>
>;
