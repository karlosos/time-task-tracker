import { createAction, EntityState } from "@reduxjs/toolkit";
import { SettingsState } from "../features/Settings/slice";
import { TimeEntry } from "../features/TimeEntries/store";

export const clearAppState = createAction("clearState");

export type BackupData = {
  timeEntries: EntityState<TimeEntry, string>;
  settings: SettingsState;
};
export const loadBackup = createAction<BackupData>("loadBackup");
