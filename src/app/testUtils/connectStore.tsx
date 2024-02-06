import { configureStore } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { Provider } from "react-redux";

import { RootState, storeReducers } from "../store/store";
import { timeEntriesInitialState } from "../features/TimeEntries/store/slice";
import { settingsInitialState } from "../features/Settings/slice";

const initialState: RootState = {
  timeEntries: timeEntriesInitialState,
  settings: settingsInitialState,
};

function connectStore(
  component: ReactElement,
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
