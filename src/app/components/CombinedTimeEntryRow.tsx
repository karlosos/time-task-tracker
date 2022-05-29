import { Checkbox, IconButton } from "@mui/material";
import { formatElapsedTime } from "../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../hooks/storeHooks";
import { timeEntriesLoggedStatusChanged, timeEntryAdded } from "../timeEntriesSlice";

export const CombinedTimeEntryRow = ({
  combinedTimeEntry,
}: {
  combinedTimeEntry: {
    text: string;
    ids: string[];
    elapsedTime: number;
    logged: boolean[];
    date: string;
  };
}) => {
  const dispatch = useAppDispatch();

  const handleAddTimeEntryClick = () => {
    dispatch(
      timeEntryAdded({ text: combinedTimeEntry.text, startTime: Date.now() })
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged(combinedTimeEntry.ids));
  };

  let checkboxState = true;
  let checkboxIsIndeterminate = false;

  if (combinedTimeEntry.logged.every((a) => a === true)) {
    checkboxState = true;
  } else if (combinedTimeEntry.logged.every((a) => a === false)) {
    checkboxState = false;
  } else {
    checkboxIsIndeterminate = true;
  }

  return (
    <div
      key={combinedTimeEntry.text}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <div
        title={combinedTimeEntry.text}
        style={{
          width: "300px",
          maxWidth: "300px",
        }}
      >
        {combinedTimeEntry.text}
      </div>
      <div style={{ flexGrow: 1 }}>
        {formatElapsedTime(combinedTimeEntry.elapsedTime)}
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
      <Checkbox
        checked={checkboxState}
        indeterminate={checkboxIsIndeterminate}
        disabled={checkboxIsIndeterminate}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
