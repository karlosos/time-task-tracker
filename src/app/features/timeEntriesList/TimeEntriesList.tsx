import { useState } from "react";
import { useAppSelector } from "../../hooks";
import {
  selectCombinedTimeEntries,
  selectTimeEntriesByDate,
  TimeEntry,
} from "../../store/timeEntries";
import { CombinedTimeEntryRow } from "./CombinedTimeEntryRow";
import { DateLabel, TimeEntriesDateSublist, TimeEntriesListStyled } from "./TimeEntriesList.style";
import { TimeEntryRow } from "./TimeEntryRow";

export const TimeEntriesList = () => {
  const [isCollapsedMode, setIsCollapsedMode] = useState(false);

  const timeEntriesByDate = useAppSelector(selectTimeEntriesByDate);
  const combinedTimeEntries = useAppSelector(selectCombinedTimeEntries);

  const renderTimeEntries = () => {
    if (isCollapsedMode) {
      return Object.entries(combinedTimeEntries)
        .sort((a, b) => (a[0] > b[0] ? -1 : 1))
        .map(([date, combinedTimeEntriesPerDate]: any[]) => {
          return (
            <TimeEntriesDateSublist key={date}>
              <DateLabel>{date}</DateLabel>
              {combinedTimeEntriesPerDate.map((combinedTimeEntries: any) => (
                <CombinedTimeEntryRow
                  combinedTimeEntry={combinedTimeEntries}
                  key={combinedTimeEntries.text}
                />
              ))}
            </TimeEntriesDateSublist>
          );
        });
    } else {
      return Object.entries(timeEntriesByDate).map(
        ([date, timeEntriesPerDate]: any[]) => {
          return (
            <TimeEntriesDateSublist key={date}>
              <DateLabel>{date}</DateLabel>
              {timeEntriesPerDate.map((timeEntry: TimeEntry) => (
                <TimeEntryRow timeEntry={timeEntry} key={timeEntry.id} />
              ))}
            </TimeEntriesDateSublist>
          );
        }
      );
    }
  };

  return (
    <>
      <button onClick={() => setIsCollapsedMode((state) => !state)}>
        {isCollapsedMode ? "Extend entries" : "Collapse entries by names"}
      </button>
      <TimeEntriesListStyled>{renderTimeEntries()}</TimeEntriesListStyled>
    </>
  );
};
