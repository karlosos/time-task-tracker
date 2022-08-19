import { useAppSelector } from "../../hooks";
import { selectCombinedTimeEntries } from "../../store/timeEntries";
import { testId } from "../../testUtils/testId";
import { formatElapsedTime } from "../../utils";
import { CombinedTimeEntryRow } from "./CombinedTimeEntryRow";
import {
  DateLabel,
  TimeEntriesDateSublist,
  TimeEntriesListStyled,
} from "./TimeEntriesList.style";

export const TimeEntriesList = () => {
  const combinedTimeEntries = useAppSelector(selectCombinedTimeEntries);

  const renderTimeEntries = () => {
    const sortedTimeEntries = Object.entries(combinedTimeEntries).sort((a, b) =>
      a[0] > b[0] ? -1 : 1
    );

    return sortedTimeEntries.length ? (
      sortedTimeEntries.map(([date, combinedTimeEntriesPerDate]: any[]) => {
        const elapsedTimePerDay = combinedTimeEntriesPerDate.reduce(
          (acc: number, combinedTimeEntries: any) =>
            acc + combinedTimeEntries.elapsedTime,
          0
        );
        return (
          <TimeEntriesDateSublist key={date}>
            <DateLabel>
              <span>{date}</span> &nbsp;
              <span>{formatElapsedTime(elapsedTimePerDay)}</span>
            </DateLabel>
            {combinedTimeEntriesPerDate.map((combinedTimeEntries: any) => (
              <CombinedTimeEntryRow
                combinedTimeEntry={combinedTimeEntries}
                key={combinedTimeEntries.text}
              />
            ))}
          </TimeEntriesDateSublist>
        );
      })
    ) : (
      <>There is no entries to show.</>
    );
  };

  return (
    <>
      <TimeEntriesListStyled>{renderTimeEntries()}</TimeEntriesListStyled>
    </>
  );
};
