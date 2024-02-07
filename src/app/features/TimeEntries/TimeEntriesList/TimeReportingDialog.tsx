import { TextField } from "@mui/material";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { Button } from "../../../ui/Button";
import { Dialog, DialogContent, DialogTitle } from "../../../ui/Dialog";
import {
  formatElapsedTime,
  formatTime,
  parseElapsedTime,
} from "../../../utils";
import { TimeEntryText } from "../components/TimeEntryText";
import {
  GroupedTimeEntry,
  timeEntriesClearTimeReported,
  timeEntriesTimeReported,
} from "../store";

interface Props {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  groupedTimeEntry: GroupedTimeEntry;
}

export const TimeReportingDialog = ({
  isVisible,
  setIsVisible,
  groupedTimeEntry,
}: Props) => {
  const dispatch = useAppDispatch();
  const {
    isValid,
    reportedTime,
    setReportedTimeString,
    reportedTimesPerEntry,
  } = useReportedTimeState(groupedTimeEntry);

  const handleClear = () => {
    dispatch(timeEntriesClearTimeReported(groupedTimeEntry.ids));
    setIsVisible(false);
  };

  const handleSave = () => {
    dispatch(timeEntriesTimeReported(reportedTimesPerEntry));
    setIsVisible(false);
  };

  const handleIncreaseTime = () => {
    const result = round30MinutesUp(reportedTime.numerical);
    setReportedTimeString(formatElapsedTime(result));
  };

  const handleDecreaseTime = () => {
    const result = round30MinutesDown(reportedTime.numerical);
    setReportedTimeString(formatElapsedTime(result));
  };

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent>
        <>
          <DialogTitle>Time Reporting</DialogTitle>
          <div className="mb-2 flex max-w-[600px] overflow-hidden">
            <TimeEntryText timeEntryText={groupedTimeEntry.text} />
          </div>
          {groupedTimeEntry.subEntries.map((entry, idx) => (
            <div className="flex items-center gap-2">
              <div className="mr-2 flex h-6 w-6 shrink-0 select-none items-center justify-center rounded border border-neutral-300 bg-neutral-100 text-xs font-medium">
                {idx + 1}
              </div>
              <div className="flex flex-col rounded border border-[#c4c4c4] text-xs font-medium text-neutral-700 sm:text-sm">
                <div className="flex items-center">
                  <div className="w-14 rounded rounded-r-none rounded-bl-none border-neutral-500 bg-neutral-500 pl-2 pt-1 text-white">
                    From:
                  </div>
                  <div className="pl-1.5 pr-2 pt-1 tabular-nums">
                    {formatTime(entry.startTime)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 rounded rounded-r-none rounded-tl-none border-neutral-500 bg-neutral-500 pb-1 pl-2 pt-1.5 text-white">
                    To:
                  </div>
                  <div className="pb-1 pl-1.5 pr-2 pt-1.5 tabular-nums">
                    {formatTime(entry.stopTime!)}
                  </div>
                </div>
              </div>
              <TextField
                label="Elapsed time"
                value={formatElapsedTime(entry.stopTime! - entry.startTime)}
                className="flex-grow"
                autoFocus={false}
                inputProps={{ readOnly: true }}
                disabled={true}
              />
              <TextField
                label="Reported time"
                value={formatElapsedTime(
                  reportedTimesPerEntry[idx].reportedTime,
                )}
                className="flex-grow"
                autoFocus={false}
                inputProps={{ readOnly: true }}
                disabled={true}
              />
            </div>
          ))}

          <hr />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-start justify-start pb-2 font-semibold text-neutral-800 sm:justify-end sm:pb-0 sm:pr-2">
              Combined:
            </div>
            <div className="flex items-center gap-2">
              <TextField
                label="Elapsed time"
                value={formatElapsedTime(groupedTimeEntry.elapsedTime)}
                className="flex-grow"
                autoFocus={false}
                inputProps={{ readOnly: true }}
                disabled={true}
              />
              <TextField
                label="Reported time"
                value={reportedTime.string}
                onChange={(e) => setReportedTimeString(e.target.value)}
                className="flex-grow"
                autoFocus={true}
                error={!isValid}
              />
              <div className="flex flex-col">
                <button
                  className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg rounded-b-none border border-b-0 border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                  onClick={handleIncreaseTime}
                >
                  <span className="flex justify-center text-sm">
                    <ArrowUp size={16} />
                  </span>
                  30 min
                </button>
                <button
                  className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg rounded-t-none border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100  hover:text-neutral-900"
                  onClick={handleDecreaseTime}
                >
                  <span className="flex justify-center text-sm">
                    <ArrowDown size={16} />
                  </span>
                  30 min
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div>
              <Button variant="outline" onClick={handleClear}>
                Clear reported times
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsVisible(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!isValid}>
                Save
              </Button>
            </div>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

function useReportedTimeState(groupedTimeEntry: GroupedTimeEntry) {
  const [reportedTimeString, setReportedTimeString] = useState(
    groupedTimeEntry.loggedTime !== 0
      ? formatElapsedTime(groupedTimeEntry.loggedTime)
      : formatElapsedTime(groupedTimeEntry.elapsedTime),
  );
  const isValid = /^\d{2}:\d{2}:\d{2}$/.test(reportedTimeString);
  const reportedTimeNumerical = isValid
    ? parseElapsedTime(reportedTimeString)
    : groupedTimeEntry.elapsedTime;

  // Calculate reported times for each entry
  // with correct proportions based on user inputs in combined reportedTime
  const reportedTimesPerEntry = useMemo(() => {
    const result = groupedTimeEntry.subEntries.map((entry) => {
      const elapsedTime = entry.stopTime! - entry.startTime;
      const ratio = elapsedTime / groupedTimeEntry.elapsedTime;
      return {
        id: entry.id,
        reportedTime: Math.floor(reportedTimeNumerical * ratio),
      };
    });
    const combinedTimes = result.reduce(
      (sum, entry) => sum + entry.reportedTime,
      0,
    );
    result[0].reportedTime =
      result[0].reportedTime + (reportedTimeNumerical - combinedTimes);

    return result;
  }, [reportedTimeNumerical, groupedTimeEntry]);

  return {
    isValid,
    reportedTime: {
      string: reportedTimeString,
      numerical: reportedTimeNumerical,
    },
    setReportedTimeString,
    reportedTimesPerEntry,
  };
}

function round30MinutesUp(timeMs: number) {
  let minutes = Math.round(Math.floor(timeMs / (60 * 1000)) % 60);
  let hours = Math.round(Math.floor(timeMs / (60 * 60 * 1000)));

  if (minutes >= 30) {
    minutes = 0;
    hours = hours + 1;
  } else {
    minutes = 30;
  }

  return minutes * 60 * 1000 + hours * 60 * 60 * 1000;
}

function round30MinutesDown(timeMs: number) {
  let minutes = Math.round(Math.floor(timeMs / (60 * 1000)) % 60);
  let hours = Math.round(Math.floor(timeMs / (60 * 60 * 1000)));

  if (minutes > 30) {
    minutes = 30;
  } else if (minutes === 0 && hours !== 0) {
    minutes = 30;
    hours = Math.max(0, hours - 1);
  } else {
    minutes = 0;
  }

  return minutes * 60 * 1000 + hours * 60 * 60 * 1000;
}
