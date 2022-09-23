import { EmptyState } from "../../components/EmptyState";
import { useAppSelector } from "../../hooks";
import { selectCombinedTimeEntries } from "../../store/timeEntries";
import { formatElapsedTime } from "../../utils";
import { CombinedTimeEntryRow } from "./CombinedTimeEntryRow";

export const TimeEntriesList = () => {
  const combinedTimeEntries = useAppSelector(selectCombinedTimeEntries);

  const sortedTimeEntries = Object.entries(combinedTimeEntries).sort((a, b) =>
    a[0] > b[0] ? -1 : 1
  );

  if (sortedTimeEntries.length === 0) {
    return (
      <EmptyState />
    );
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
