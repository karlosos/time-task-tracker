import { EntityState } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TimeEntry } from "../features/TimeEntries/store";
import { SettingsState } from "../features/Settings/slice";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    // TODO: we need to check if its good before returning
    // because it can actually cause errors when the state schema changed before last save

    // TODO: i've changed the schema (added featureFlags)
    //       and it causing problems in migration
    //       because when loading app it preloads the state from localStorage
    //       and it ignores initialState from slices
    //       maybe it would be better for populate it firstly with initialState
    //       and then load the data from localStorage?
    const parsed = JSON.parse(serializedState);
    if (parsed.settings.featureFlags === undefined) {
      parsed.settings.featureFlags = {
        isAdjustableTimeReportingEnabled: false,
      };
    }

    // TODO: couldn't used RootState
    return parsed as {
      timeEntries: EntityState<TimeEntry, string>;
      settings: SettingsState;
    };
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};
