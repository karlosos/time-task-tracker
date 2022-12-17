import { useState } from "react";
import { EmptyState } from "../../components/EmptyState";
import { useAppSelector } from "../../hooks";
import {
  selectCombinedTimeEntries,
  selectTimeEntriesCount,
} from "../../store/timeEntries";
import { formatElapsedTime } from "../../utils";
import { CombinedTimeEntryRow } from "./CombinedTimeEntryRow";

const TIME_ENTRIES_LIMIT = 50;

export const TimeEntriesList = () => {
  const [timeEntriesLimit, setTimeEntriesLimit] = useState(TIME_ENTRIES_LIMIT);
  const combinedTimeEntries = useAppSelector((state) =>
    selectCombinedTimeEntries(state, timeEntriesLimit)
  );

  const sortedTimeEntries = Object.entries(combinedTimeEntries).sort((a, b) =>
    a[0] > b[0] ? -1 : 1
  );

  if (sortedTimeEntries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-4 flex flex-col space-y-6">
      {sortedTimeEntries.map(([date, combinedTimeEntriesPerDate]: any[]) => {
        const elapsedTimePerDay = combinedTimeEntriesPerDate.reduce(
          (acc: number, combinedTimeEntries: any) =>
            acc + combinedTimeEntries.elapsedTime,
          0
        );
        return (
          <div
            key={date}
            className="p-4 rounded-lg shadow-[-2px_5px_20px_0px_#0000001A]"
          >
            <DayHeader date={date} elapsedTimePerDay={elapsedTimePerDay} />
            {combinedTimeEntriesPerDate.map((combinedTimeEntries: any) => (
              <CombinedTimeEntryRow
                combinedTimeEntry={combinedTimeEntries}
                key={combinedTimeEntries.text}
              />
            ))}
          </div>
        );
      })}

      <PaginationButtons
        timeEntriesLimit={timeEntriesLimit}
        setTimeEntriesLimit={setTimeEntriesLimit}
      />
    </div>
  );
};

function DayHeader({
  date,
  elapsedTimePerDay,
}: {
  date: string;
  elapsedTimePerDay: number;
}) {
  return (
    <div>
      <span className="text-lg text-neutral-700 font-semibold">{date}</span>{" "}
      &nbsp;
      <span className="text-lg text-neutral-700 opacity-50 font-semibold">
        {formatElapsedTime(elapsedTimePerDay)}
      </span>
    </div>
  );
}

type PaginationButtonsProps = {
  timeEntriesLimit: number;
  setTimeEntriesLimit: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationButtons = ({
  timeEntriesLimit,
  setTimeEntriesLimit,
}: PaginationButtonsProps) => {
  const timeEntriesCount = useAppSelector(selectTimeEntriesCount);

  const handleLoadMore = () => {
    setTimeEntriesLimit((state) => state + TIME_ENTRIES_LIMIT);
  };

  const handleLoadAll = () => {
    setTimeEntriesLimit(Infinity);
  };

  if (timeEntriesCount < timeEntriesLimit) {
    return null;
  }

  return (
    <div className="pt-[10px] flex flex-row justify-end gap-[10px]">
      <button
        onClick={handleLoadAll}
        className="bg-white border-2 border-blue-600 rounded text-blue-600 hover:text-blue-800 hover:border-blue-800 px-3 py-1.5 font-medium"
      >
        Load All
      </button>
      <button
        onClick={handleLoadMore}
        className="bg-blue-600 rounded text-white hover:bg-blue-800 px-3 py-1.5 font-medium"
      >
        Load More
      </button>
    </div>
  );
};
