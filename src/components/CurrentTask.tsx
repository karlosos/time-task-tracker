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
      <Typography
        title={currentTask.text}
        variant="h6"
        component="div"
        sx={{
          maxWidth: "300px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {currentTask.text}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ marginLeft: "20px", flexGrow: 1 }}
      >
        {formatElapsedTime(elapsedTime)}
      </Typography>
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