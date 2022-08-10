import { configureStore } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { Provider } from "react-redux";

import { RootState, storeReducers } from "../store/store";
import { timeEntriesInitialState } from "../store/timeEntries";

const initialState: RootState = {
  timeEntries: timeEntriesInitialState,
}

function connectStore(
  component: ReactElement,
  preloadedState: RootState = initialState
) {
  console.log('>>preloadedState', preloadedState)
  const store = configureStore({
    reducer: storeReducers,
    preloadedState,
  });

  return <Provider store={store}>{component}</Provider>;
}

export default connectStore;
