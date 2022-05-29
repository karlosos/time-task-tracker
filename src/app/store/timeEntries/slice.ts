import {
  createSlice,
  createEntityAdapter,
  EntityState,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { generateId } from "../../utils";

export interface TimeEntry {
  id: string;
  text: string;
  startTime: number;
  stopTime?: number;
  logged: boolean;
}

export const timeEntriesAdapter = createEntityAdapter<TimeEntry>();

const initialState: EntityState<TimeEntry> = {
  ids: ["1", "2", "3"],
  entities: {
    "1": {
      id: "1",
      text: "DX1-3213: Doing something",
      startTime: 1653236911845,
      stopTime: undefined,
      logged: false,
    },
    "2": {
      id: "2",
      text: "DX1-1111: Different task",
      startTime: 1653236911845,
      stopTime: 1653237028845,
      logged: false,
    },
    "3": {
      id: "3",
      text: "DX1-1111: Different task",
      startTime: 1653672520415,
      stopTime: 1653672530415,
      logged: false,
    },
  },
};

export const timeEntries = createSlice({
  name: "timeEntries",
  initialState,
  reducers: {
    timeEntryAdded: (
      state,
      action: PayloadAction<{ text: string; startTime: number }>
    ) => {
      // Stop currently running entry
      const currentTimeEntry = Object.values(state.entities).find(
        (timeEntry) => timeEntry?.stopTime === undefined
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
    
    timeEntryStopped: (state, action: PayloadAction<EntityId>) => {
      const changes: Partial<TimeEntry> = {
        stopTime: Date.now(),
      };
      timeEntriesAdapter.updateOne(state, { id: action.payload, changes });
    },

    timeEntriesLoggedStatusChanged: (
      state,
      action: PayloadAction<EntityId[]>
    ) => {
      const ids = action.payload;
      ids.forEach((id) => {
        if (state.entities[id]) {
          state.entities[id]!.logged = !state.entities[id]?.logged;
        }
      });
    },
  },
});

export const {
  timeEntryAdded,
  timeEntryStopped,
  timeEntriesLoggedStatusChanged,
} = timeEntries.actions;

export default timeEntries.reducer;
