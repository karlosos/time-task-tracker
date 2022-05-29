import {
  createSlice,
  createEntityAdapter,
  EntityState,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { formatDayMonthYear, generateId } from "./utils";

export interface TimeEntry {
  id: string;
  text: string;
  startTime: number;
  stopTime?: number;
  logged: boolean;
}

const timeEntriesAdapter = createEntityAdapter<TimeEntry>();

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

export const {
  selectById: selectTimeEntryById,
  selectIds: selectTimeEntriesIds,
  selectEntities: selectTimeEntryEntities,
  selectAll: selectAllTimeEntries,
  selectTotal: selectTimeEntriesCount,
} = timeEntriesAdapter.getSelectors((state: RootState) => state.timeEntries);

export const selectCurrentTimeEntry = (state: RootState) => {
  const currentTimeEntry = Object.values(state.timeEntries.entities).find(
    (timeEntry) => timeEntry?.stopTime === undefined
  );

  return currentTimeEntry;
};

export const selectCombinedTimeEntries = (state: RootState) => {
  const timeEntries = selectAllTimeEntries(state)
    .filter((entry) => entry.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!);

  return timeEntries
    .sort((a: any, b: any) => a.startTime - b.startTime)
    .reduce(groupTimeEntriesByText, [])
    .reverse()
    .reduce(groupCombinedTimeEntriesByDate, {});
};

export const selectTimeEntriesByDate = (state: RootState) => {
  const timeEntriesByDate = selectAllTimeEntries(state)
    .filter((entry) => entry.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!)
    .reduce(groupTimeEntriesByDate, {});

  return timeEntriesByDate;
};

const groupTimeEntriesByText = (grouped: any[], current: TimeEntry) => {
  const found = grouped.find((el) => {
    const sameName = el.text === current.text;
    const sameDay = el.date === formatDayMonthYear(current.stopTime!);
    return sameName && sameDay;
  });

  const diff = current.stopTime! - current.startTime;
  if (found) {
    found.elapsedTime = found.elapsedTime + diff;
    found.ids.push(current.id);
    found.logged.push(current.logged);
  } else {
    grouped.push({
      text: current.text,
      ids: [current.id],
      elapsedTime: diff,
      date: formatDayMonthYear(current.stopTime!),
      logged: [current.logged],
    });
  }

  return grouped;
};

const groupCombinedTimeEntriesByDate = (grouped: any, current: any) => {
  if (!grouped[current.date]) {
    grouped[current.date] = [];
  }
  grouped[current.date] = [...grouped[current.date], current];

  return grouped;
};

const groupTimeEntriesByDate = (grouped: any, current: any) => {
  const currentDate = formatDayMonthYear(current.stopTime!);

  if (!grouped[currentDate]) {
    grouped[currentDate] = [];
  }
  grouped[currentDate] = [...grouped[currentDate], current];

  return grouped;
};

export default timeEntries.reducer;
