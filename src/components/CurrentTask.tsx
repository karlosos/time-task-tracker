import { IconButton, Typography } from "@mui/material";
import { Task } from "../useTasks";
import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../utils";

export const CurrentTask = ({
  currentTask,
  elapsedTime,
  onStopClick,
}: {
  currentTask: Task;
  elapsedTime: number;
  onStopClick: () => void;
}) => {
  return (
    <>
      <div
        title={currentTask.text}
        style={{ width: "300px", maxWidth: "300px" }}
      >
        {currentTask.text}
      </div>
      <div style={{flexGrow: 1}}>
        {formatElapsedTime(elapsedTime)}
      </div>
      <IconButton
        onClick={onStopClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <StopIcon />
      </IconButton>
    </>
  );
};