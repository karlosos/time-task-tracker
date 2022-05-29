import { IconButton } from "@mui/material";
import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../utils";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { TimeEntry, timeEntryStopped } from "../timeEntriesSlice";

export const CurrentTask = ({
  currentTask,
}: {
  currentTask: TimeEntry;
}) => {
  const dispatch = useAppDispatch();

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

  const handleOnStopClick = () => {
    dispatch(timeEntryStopped(currentTask.id));
  }

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
        onClick={handleOnStopClick}
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