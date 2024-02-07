import {
  createSlice,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { clearAppState, loadBackup } from "../../../store/commonActions";
import { generateId } from "../../../utils";
import { timeEntriesFixture } from "./fixtures";

export interface TimeEntry {
  id: string;
  text: string;
  startTime: number;
  stopTime?: number;
  logged: boolean;
  loggedTime?: number; // TODO: make mandatory with 0 by default?
}

export const timeEntriesAdapter = createEntityAdapter<TimeEntry>();

export let timeEntriesInitialState: EntityState<TimeEntry, string>;
// Change to false for using example data
if (true) {
  timeEntriesInitialState = {
    ids: [],
    entities: {},
  };
} else {
  timeEntriesInitialState = timeEntriesFixture;
}

export const timeEntries = createSlice({
  name: "timeEntries",
  initialState: timeEntriesInitialState,
  reducers: {
    timeEntryAdded: (
      state,
      action: PayloadAction<{ text: string; startTime: number }>,
    ) => {
      // Stop currently running entry
      const currentTimeEntry = Object.values(state.entities).find(
        (timeEntry) => timeEntry?.stopTime === undefined,
      );
      if (currentTimeEntry?.id) {
        state.entities[currentTimeEntry.id]!.stopTime = Date.now();
      }

      // Create new entry
      const newEntry: TimeEntry = {
        id: generateId(),
        text: action.payload.text,
        startTime: action.payload.startTime,
        logged: false,
      };

      timeEntriesAdapter.addOne(state, newEntry);
    },

    timeEntryUpdated: timeEntriesAdapter.updateOne,

    timeEntryRemoved: timeEntriesAdapter.removeOne,

    timeEntryStopped: (state, action: PayloadAction<string>) => {
      const changes: Partial<TimeEntry> = {
        stopTime: Date.now(),
      };
      timeEntriesAdapter.updateOne(state, { id: action.payload, changes });
    },

    timeEntriesLoggedStatusChanged: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      const ids = action.payload;
      ids.forEach((id) => {
        if (state.entities[id]) {
          state.entities[id]!.logged = !state.entities[id]?.logged;
        }
      });
    },

    timeEntriesTimeReported: (
      state,
      action: PayloadAction<
        {
          id: string;
          reportedTime: number;
        }[]
      >,
    ) => {
      action.payload.forEach(({ id, reportedTime }) => {
        if (state.entities[id]) {
          state.entities[id]!.logged = true;
          state.entities[id]!.loggedTime = reportedTime;
        }
      });
    },

    timeEntriesClearTimeReported: (state, action: PayloadAction<string[]>) => {
      const ids = action.payload;
      ids.forEach((id) => {
        if (state.entities[id]) {
          state.entities[id]!.logged = false;
          state.entities[id]!.loggedTime = undefined;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearAppState, (state, action) => {
      return timeEntriesInitialState;
    });
    builder.addCase(loadBackup, (state, action) => {
      return action.payload.timeEntries;
    });
  },
});

export const {
  timeEntryAdded,
  timeEntryUpdated,
  timeEntryRemoved,
  timeEntryStopped,
  timeEntriesLoggedStatusChanged,
  timeEntriesTimeReported,
  timeEntriesClearTimeReported,
} = timeEntries.actions;
