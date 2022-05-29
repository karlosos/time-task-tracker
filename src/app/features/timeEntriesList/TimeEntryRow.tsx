import { Checkbox } from "@mui/material";
import { formatElapsedTime } from "../../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks";
import { timeEntriesLoggedStatusChanged, TimeEntry, timeEntryAdded } from "../../timeEntriesSlice";
import { ElapsedTime, IconButtonStyled, TimeEntryRowStyled, TimeEntryText } from "./TimeEntriesList.style";

export const TimeEntryRow = ({
  timeEntry,
}: {
  timeEntry: TimeEntry;
}) => {
  const dispatch = useAppDispatch();

  const handleAddTimeEntryClick = () => {
    dispatch(timeEntryAdded({text: timeEntry.text, startTime: Date.now()}));
  }

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
      <IconButtonStyled
        size="large"
        color="inherit"
        onClick={handleAddTimeEntryClick}
      >
        <PlayCircle />
      </IconButtonStyled>
      <Checkbox checked={timeEntry.logged} onChange={handleCheckboxChange} />
    </TimeEntryRowStyled>
  );
};
