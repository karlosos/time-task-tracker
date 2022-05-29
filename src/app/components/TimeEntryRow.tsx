import { Checkbox, IconButton } from "@mui/material";
import { formatElapsedTime } from "../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../hooks/storeHooks";
import { timeEntriesLoggedStatusChanged, TimeEntry, timeEntryAdded } from "../timeEntriesSlice";

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
    <div
      key={timeEntry.id}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <div
        title={timeEntry.text}
        style={{
          width: '300px',
          maxWidth: '300px',
        }}
      >
        {timeEntry.text}
      </div>
      <div
        style={{ flexGrow: 1 }}
      >
        {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
      </div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleAddTimeEntryClick}
      >
        <PlayCircle />
      </IconButton>
      <Checkbox checked={timeEntry.logged} onChange={handleCheckboxChange} />
    </div>
  );
};
