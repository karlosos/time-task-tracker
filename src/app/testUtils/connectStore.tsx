import { configureStore } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { Provider } from "react-redux";

import { settingsInitialState } from "../features/Settings/slice";
import { timeEntriesInitialState } from "../features/TimeEntries/store/slice";
import { shiftTimerInitialState } from "../features/Timer/slice";
import { RootState, storeReducers } from "../store/store";

const initialState: RootState = {
  timeEntries: timeEntriesInitialState,
  settings: settingsInitialState,
  shiftTimer: shiftTimerInitialState,
};

function connectStore(
  component: ReactElement<any>,
  preloadedState: RootState = initialState,
) {
  // TODO: see store.ts regarding preloadedState typing
  const store = configureStore({
    reducer: storeReducers,
    preloadedState,
  });

  return <Provider store={store}>{component}</Provider>;
}

export default connectStore;
