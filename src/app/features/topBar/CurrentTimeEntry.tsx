import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../../utils";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { TimeEntry, timeEntryStopped } from "../../store/timeEntries/slice";
import { CurrentTimeEntryText, ElapsedTime, IconButtonStyled } from "./TopBar.style";

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
      <CurrentTimeEntryText
        title={currentTimeEntry.text}
      >
        {currentTimeEntry.text}
      </CurrentTimeEntryText>
      <ElapsedTime>
        {formatElapsedTime(elapsedTime)}
      </ElapsedTime>
      <IconButtonStyled
        onClick={handleOnStopClick}
        size="large"
        color="inherit"
      >
        <StopIcon />
      </IconButtonStyled>
    </>
  );
};