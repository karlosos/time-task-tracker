import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearAppState, loadBackup } from "../../store/commonActions";
import { AppThunk, RootState } from "../../store/store";

export type LinkPattern = {
  regex: string;
  url: string;
};

export type SettingsState = {
  patterns: LinkPattern[];
};

export const settingsInitialState: SettingsState = {
  patterns: [
    {
      regex: "(DX1-\\d+)",
      url: "https://jiradc2.ext.net.nokia.com/browse/",
    },
    {
      regex: "(KAR-\\d+)",
      url: "https://linear.app/karlosos/issue/",
    },
    {
      regex: "(FCA_UTF_[A-Z_]+-\\d+)",
      url: "https://jiradc.ext.net.nokia.com/browse/",
    },
    {
      regex: "(PR\\d+)",
      url: "https://pronto.ext.net.nokia.com/pronto/problemReport.html?prid=",
    },
    {
      regex: "(FCA_TTS_[A-Z_]+-\\d+)",
      url: "https://jiradc.ext.net.nokia.com/browse/",
    },
  ],
};

export const settings = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    patternsChanged: (state, action: PayloadAction<LinkPattern[]>) => {
      state.patterns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearAppState, (state, action) => {
      return settingsInitialState;
    });
    builder.addCase(loadBackup, (state, action) => {
      return action.payload.settings;
    });
  },
});

export const { patternsChanged } = settings.actions;

export default settings.reducer;

export const downloadAppData = (): AppThunk => async (_dispatch, getState) => {
  const data = getState();
  const filename = `tracking-data-${formatDateTime(new Date())}`;
  createAndDownloadFile(filename, data);
};

const createAndDownloadFile = (filename: string, data: RootState) => {
  // Creating a blob object from non-blob data using the Blob constructor
  // If you want to have nice formatting then use `JSON.stringify(data, undefined, 2)`
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  // Create a new anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  a.click();
  a.remove();
};

const formatDateTime = (date: Date) => {
  // Get the individual date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date as a string
  const formattedDate = `${year}-${month}-${day}-${hours}:${minutes}`;
  return formattedDate;
};
