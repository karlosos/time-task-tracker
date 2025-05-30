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
    (timeEntry) => timeEntry?.stopTime === undefined,
  );

  return currentTimeEntry;
};

export const selectTimeEntriesGroupedByDate = createSelector(
  [selectAllTimeEntries, (_, limit: number) => limit],
  (allTimeEntries, limit?: number) => {
    let timeEntries: TimeEntry[] = allTimeEntries
      .filter((entry) => entry.stopTime)
      .sort((a, b) => b.stopTime! - a.stopTime!);

    if (limit !== undefined) {
      timeEntries = timeEntries.slice(0, limit);
    }

    const groupedByDate = timeEntries
      .sort((a, b) => a.startTime - b.startTime)
      .reduce(groupTimeEntriesByText, [])
      .reverse()
      .reduce(
        groupCombinedTimeEntriesByDate,
        new Map<string, GroupedTimeEntry[]>(),
      );

    // remove last (incomplete) day if there are more elements remaining
    // this way we don't have incomplete groups
    const allCompletedTimeEntries = allTimeEntries.filter(
      (entry) => entry.stopTime,
    );
    if (timeEntries.length !== allCompletedTimeEntries.length) {
      const lastKey = Array.from(groupedByDate.keys()).pop();
      if (lastKey) {
        groupedByDate.delete(lastKey);
      }
    }

    return groupedByDate;
  },
);

export const selectTodayReportedTime = (state: RootState) => {
  const allEntries = selectAllTimeEntries(state);

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const endOfDay = startOfDay + 24 * 60 * 60 * 1000;

  const todayEntries = allEntries.filter(
    (entry) => entry.startTime >= startOfDay && entry.startTime < endOfDay,
  );

  const loggedTime = todayEntries
    .map((entry) => entry.loggedTime ?? 0)
    .reduce((sum, time) => sum + time, 0);

  return loggedTime;
};

export const selectLast7DaysReportedTime = (state: RootState) => {
  const allEntries = selectAllTimeEntries(state);

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const startOf7DaysAgo = startOfToday - 7 * 24 * 60 * 60 * 1000; // 7 full days ago

  const relevantEntries = allEntries.filter(
    (entry) =>
      entry.startTime >= startOf7DaysAgo && entry.startTime < startOfToday,
  );

  const loggedTime = relevantEntries
    .map((entry) => entry.loggedTime ?? 0)
    .reduce((sum, time) => sum + time, 0);

  return loggedTime;
};

export type GroupedTimeEntry = {
  text: string;
  ids: string[];
  subEntries: TimeEntry[];
  elapsedTime: number;
  loggedTime: number;
  logged: boolean[];
  date: string;
};

const groupTimeEntriesByText = (
  grouped: GroupedTimeEntry[],
  current: TimeEntry,
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
    found.loggedTime =
      found.loggedTime + (current.logged ? (current.loggedTime ?? 0) : 0);
  } else {
    grouped.push({
      text: current.text,
      ids: [current.id],
      subEntries: [current],
      elapsedTime: diff,
      date: formatDayMonthYear(current.stopTime!),
      logged: [current.logged],
      loggedTime: current.logged ? (current.loggedTime ?? 0) : 0,
    });
  }

  return grouped;
};

type EntriesByDateMap = Map<string, GroupedTimeEntry[]>;

const groupCombinedTimeEntriesByDate = (
  grouped: EntriesByDateMap,
  current: GroupedTimeEntry,
) => {
  if (!grouped.has(current.date)) {
    grouped.set(current.date, []);
  }
  grouped.get(current.date)?.push(current);

  return grouped;
};
