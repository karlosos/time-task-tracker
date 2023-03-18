import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type LinkPattern = {
  regex: string;
  url: string;
};

type State = {
    patterns: LinkPattern[];
}

export const settingsInitialState: State = {
  patterns: [
    {
      regex: "(DX1-\\d+)",
      url: "https://jiradc2.ext.net.nokia.com/browse",
    },
    {
      regex: "(KAR-\\d+)",
      url: "https://linear.app/karlosos/issue",
    },
    {
      regex: "(FCA_UTF_[A-Z_]+-\\d+)",
      url: "https://jiradc.ext.net.nokia.com/browse",
    },
  ],
};

export const settings = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    patternsChanged: (state, action: PayloadAction<any>) => {
      state.patterns = action.payload;
      console.log('>> patternsChanged', action.payload);
    },
  },
});

export const { patternsChanged } = settings.actions;

export default settings.reducer;
