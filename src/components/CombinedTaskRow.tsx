import { Checkbox, IconButton } from "@mui/material";
import { formatElapsedTime } from "../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../hooks/storeHooks";
import { timeEntriesLoggedStatusChanged, timeEntryAdded } from "../timeEntriesSlice";

export const CombinedTaskRow = ({
  combinedTask,
}: {
  combinedTask: {
    text: string;
    ids: string[];
    elapsedTime: number;
    logged: boolean[];
    date: string;
  };
}) => {
  const dispatch = useAppDispatch();

  const handleAddTaskClick = () => {
    dispatch(
      timeEntryAdded({ text: combinedTask.text, startTime: Date.now() })
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged(combinedTask.ids));
  };

  let checkboxState = true;
  let checkboxIsIndeterminate = false;

  if (combinedTask.logged.every((a) => a === true)) {
    checkboxState = true;
  } else if (combinedTask.logged.every((a) => a === false)) {
    checkboxState = false;
  } else {
    checkboxIsIndeterminate = true;
  }

  return (
    <div
      key={combinedTask.text}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <div
        title={combinedTask.text}
        style={{
          width: "300px",
          maxWidth: "300px",
        }}
      >
        {combinedTask.text}
      </div>
      <div style={{ flexGrow: 1 }}>
        {formatElapsedTime(combinedTask.elapsedTime)}
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
      <Checkbox
        checked={checkboxState}
        indeterminate={checkboxIsIndeterminate}
        disabled={checkboxIsIndeterminate}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
