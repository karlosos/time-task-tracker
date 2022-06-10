import { useAppSelector } from "../../hooks";
import {
  selectCombinedTimeEntries,
} from "../../store/timeEntries";
import { CombinedTimeEntryRow } from "./CombinedTimeEntryRow";
import { DateLabel, TimeEntriesDateSublist, TimeEntriesListStyled } from "./TimeEntriesList.style";

export const TimeEntriesList = () => {
  const combinedTimeEntries = useAppSelector(selectCombinedTimeEntries);

  const renderTimeEntries = () => {
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
  };

  return (
    <>
      <TimeEntriesListStyled>{renderTimeEntries()}</TimeEntriesListStyled>
    </>
  );
};
