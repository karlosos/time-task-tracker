import { Checkbox, IconButton } from "@mui/material";
import { formatElapsedTime } from "../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../hooks/storeHooks";
import { timeEntriesLoggedStatusChanged, TimeEntry, timeEntryAdded } from "../timeEntriesSlice";

export const TaskRow = ({
  task,
}: {
  task: TimeEntry;
}) => {
  const dispatch = useAppDispatch();

  const handleAddTaskClick = () => {
    dispatch(timeEntryAdded({text: task.text, startTime: Date.now()}));
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged([task.id]));
  }

  return (
    <div
      key={task.id}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <div
        title={task.text}
        style={{
          width: '300px',
          maxWidth: '300px',
        }}
      >
        {task.text}
      </div>
      <div
        style={{ flexGrow: 1 }}
      >
        {formatElapsedTime(task.stopTime! - task.startTime)}
      </div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleAddTaskClick}
      >
        <PlayCircle />
      </IconButton>
      <Checkbox checked={task.logged} onChange={handleCheckboxChange} />
    </div>
  );
};
