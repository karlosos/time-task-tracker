import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { formatDayMonthYear } from "../../../utils";
import { timeEntriesAdapter, TimeEntry } from "./slice";

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

export const selectTimeEntriesGroupedByDate = createSelector(
  [selectAllTimeEntries, (_, limit: number) => limit],
  (allTimeEntries, limit?: number) => {
    let timeEntries = allTimeEntries
      .filter((entry) => entry.stopTime)
      .sort((a, b) => b.stopTime! - a.stopTime!);

    if (limit !== undefined) {
      timeEntries = timeEntries.slice(0, limit);
    }

    return timeEntries
      .sort((a, b) => a.startTime - b.startTime)
      .reduce(groupTimeEntriesByText, [])
      .reverse()
      .reduce(groupCombinedTimeEntriesByDate, {});
  }
);

export type GroupedTimeEntry = {
  text: string;
  ids: string[];
  subEntries: TimeEntry[];
  elapsedTime: number;
  logged: boolean[];
  date: string;
};

const groupTimeEntriesByText = (
  grouped: GroupedTimeEntry[],
  current: TimeEntry
) => {
  const found = grouped.find((el) => {
    const sameName = el.text === current.text;
    const sameDay = el.date === formatDayMonthYear(current.stopTime!);
    return sameName && sameDay;
  });

  const diff = current.stopTime! - current.startTime;
  if (found) {
    found.elapsedTime = found.elapsedTime + diff;
    found.ids.push(current.id);
    found.subEntries.push(current);
    found.logged.push(current.logged);
  } else {
    grouped.push({
      text: current.text,
      ids: [current.id],
      subEntries: [current],
      elapsedTime: diff,
      date: formatDayMonthYear(current.stopTime!),
      logged: [current.logged],
    });
  }

  return grouped;
};

type GroupedEntriesByDate = {
  [date: string]: GroupedTimeEntry[];
};

const groupCombinedTimeEntriesByDate = (
  grouped: GroupedEntriesByDate,
  current: GroupedTimeEntry
) => {
  if (!grouped[current.date]) {
    grouped[current.date] = [];
  }
  grouped[current.date] = [...grouped[current.date], current];

  return grouped;
};
