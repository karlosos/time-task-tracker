import { useAppSelector } from "../../hooks";
import { selectCombinedTimeEntries } from "../../store/timeEntries";
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
          <TimeEntriesDateSublist
            key={date}
            className="p-4 rounded-lg shadow-[-2px_5px_20px_0px_#0000001A]"
          >
            <DateLabel>
              <span className="font-poppins text-[18px] text-[#353942] font-semibold">
                {date}
              </span>{" "}
              &nbsp;
              <span className="font-poppins text-[18px] text-[#353942] opacity-50 font-semibold">
                {formatElapsedTime(elapsedTimePerDay)}
              </span>
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
    <TimeEntriesListStyled className="mt-4 flex flex-col space-y-6">
      {renderTimeEntries()}
    </TimeEntriesListStyled>
  );
};
