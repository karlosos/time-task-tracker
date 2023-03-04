import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../../../utils";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useAppDispatch } from "../../../hooks";
import { ElapsedTime, TopBarStyled } from "./TopBar.style";
import { TimeEntryEdit } from "../components/TimeEntryEdit";
import { TimeEntryText } from "../components/TimeEntryText";
import { IconButton } from "@mui/material";
import { TimeEntry, timeEntryStopped } from "../store";

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
        <div className="flex-grow ml-4 whitespace-nowrap text-ellipsis overflow-hidden ">
          <TimeEntryText timeEntryText={currentTimeEntry.text} />
        </div>
        <div className="flex flex-row space-x-2 justify-center items-center">
          <ElapsedTime
            onClick={() => setIsEditVisible((state) => !state)}
            aria-label="elapsed time"
          >
            <span className="ml-4">{formatElapsedTime(elapsedTime)}</span>
          </ElapsedTime>
          <div className="text-red-300">
            <IconButton
              onClick={handleOnStopClick}
              size="large"
              color="inherit"
              aria-label="stop timer"
            >
              <StopIcon />
            </IconButton>
          </div>
        </div>
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
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setElapsedTime(
      currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
    );
  }, [currentTimeEntry]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime(
        currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
      );
    }, 500);

    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return elapsedTime;
};
