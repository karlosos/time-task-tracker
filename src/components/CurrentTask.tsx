import { IconButton } from "@mui/material";
import { Task } from "../hooks/useTasks";
import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../utils";
import { useState, useEffect, useRef } from "react";

export const CurrentTask = ({
  currentTask,
  onStopClick,
}: {
  currentTask: Task;
  onStopClick: () => void;
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(currentTask ? Date.now() - currentTask.startTime : 0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setElapsedTime(currentTask ? Date.now() - currentTask.startTime : 0);
  }, [currentTask])

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setElapsedTime(currentTask ? Date.now() - currentTask.startTime : 0);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

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