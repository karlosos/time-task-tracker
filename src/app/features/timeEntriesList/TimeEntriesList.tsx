import { useAppSelector } from "../../hooks";
import {
  selectCombinedTimeEntries,
} from "../../store/timeEntries";
import { formatElapsedTime } from "../../utils";
import { CombinedTimeEntryRow } from "./CombinedTimeEntryRow";
import { DateLabel, TimeEntriesDateSublist, TimeEntriesListStyled } from "./TimeEntriesList.style";

export const TimeEntriesList = () => {
  const combinedTimeEntries = useAppSelector(selectCombinedTimeEntries);

  const renderTimeEntries = () => {
      return Object.entries(combinedTimeEntries)
        .sort((a, b) => (a[0] > b[0] ? -1 : 1))
        .map(([date, combinedTimeEntriesPerDate]: any[]) => {
          const elapsedTimePerDay = combinedTimeEntriesPerDate.reduce((acc: number, combinedTimeEntries: any) => acc + combinedTimeEntries.elapsedTime, 0)
          return (
            <TimeEntriesDateSublist key={date}>
              <DateLabel>{date} {formatElapsedTime(elapsedTimePerDay)}</DateLabel>
              {combinedTimeEntriesPerDate.map((combinedTimeEntries: any) => (
                <CombinedTimeEntryRow
                  combinedTimeEntry={combinedTimeEntries}
                  key={combinedTimeEntries.text}
                />
              ))}
            </TimeEntriesDateSublist>
          );
        });
  };

  return (
    <>
      <TimeEntriesListStyled>{renderTimeEntries()}</TimeEntriesListStyled>
    </>
  );
};
