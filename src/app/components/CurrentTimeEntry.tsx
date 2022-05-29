import { IconButton } from "@mui/material";
import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../utils";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { TimeEntry, timeEntryStopped } from "../timeEntriesSlice";

export const CurrentTimeEntry = ({
  currentTimeEntry,
}: {
  currentTimeEntry: TimeEntry;
}) => {
  const dispatch = useAppDispatch();

  const [elapsedTime, setElapsedTime] = useState<number>(currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setElapsedTime(currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0);
  }, [currentTimeEntry])

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setElapsedTime(currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  const handleOnStopClick = () => {
    dispatch(timeEntryStopped(currentTimeEntry.id));
  }

  return (
    <>
      <div
        title={currentTimeEntry.text}
        style={{ width: "300px", maxWidth: "300px" }}
      >
        {currentTimeEntry.text}
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