import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../../utils";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useAppDispatch } from "../../hooks";
import { TimeEntry, timeEntryStopped } from "../../store/timeEntries/slice";
import {
  CurrentTimeEntryText,
  ElapsedTime,
  IconButtonStyled,
  TopBarStyled,
} from "./TopBar.style";
import { TimeEntryEdit } from "../timeEntriesList/TimeEntryEdit";

interface CurrentTimeEntryProps {
  currentTimeEntry: TimeEntry;
}

export const CurrentTimeEntry: React.FC<CurrentTimeEntryProps> = ({
  currentTimeEntry,
}) => {
  const dispatch = useAppDispatch();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const elapsedTime = useElapsedTimeForEntry(currentTimeEntry);

  const handleOnStopClick = () => {
    dispatch(timeEntryStopped(currentTimeEntry.id));
  };

  return (
    <>
      <TopBarStyled>
        <CurrentTimeEntryText title={currentTimeEntry.text}>
          {currentTimeEntry.text}
        </CurrentTimeEntryText>
        <ElapsedTime onClick={() => setIsEditVisible((state) => !state)} aria-label='elapsed time'>
          {formatElapsedTime(elapsedTime)}
        </ElapsedTime>
        <IconButtonStyled
          onClick={handleOnStopClick}
          size="large"
          color="inherit"
          aria-label="stop timer"
        >
          <StopIcon />
        </IconButtonStyled>
      </TopBarStyled>
      {isEditVisible && (
        <TimeEntryEdit
          timeEntry={currentTimeEntry}
          setIsEditVisible={setIsEditVisible}
        />
      )}
    </>
  );
};

const useElapsedTimeForEntry = (currentTimeEntry: TimeEntry) => {
  const [elapsedTime, setElapsedTime] = useState<number>(
    currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setElapsedTime(
      currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
    );
  }, [currentTimeEntry]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setElapsedTime(
        currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  return elapsedTime;
};
