import { formatDayMonthYear } from "../../utils";
import { RootState } from "../store";
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

export const selectCombinedTimeEntries = (state: RootState, limit?: number) => {
  let timeEntries = selectAllTimeEntries(state)
    .filter((entry) => entry.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!);

  if (limit !== undefined) {
    timeEntries = timeEntries.slice(0, limit);
  }

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
