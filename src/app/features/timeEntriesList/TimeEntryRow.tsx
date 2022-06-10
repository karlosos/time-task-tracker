import { Checkbox } from "@mui/material";
import { formatElapsedTime } from "../../utils";
import { useAppDispatch } from "../../hooks";
import { timeEntriesLoggedStatusChanged, TimeEntry } from "../../store/timeEntries/slice";
import { ElapsedTime, TimeEntryRowStyled, TimeEntryText } from "./TimeEntriesList.style";

export const TimeEntryRow = ({
  timeEntry,
}: {
  timeEntry: TimeEntry;
}) => {
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged([timeEntry.id]));
  }

  return (
    <TimeEntryRowStyled>
      <TimeEntryText
        title={timeEntry.text}
      >
        {timeEntry.text}
      </TimeEntryText>
      <ElapsedTime>
        {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
      </ElapsedTime>
      <Checkbox checked={timeEntry.logged} onChange={handleCheckboxChange} />
    </TimeEntryRowStyled>
  );
};
