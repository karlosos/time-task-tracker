import StopIcon from "@mui/icons-material/StopCircle";
import { formatElapsedTime } from "../../utils";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { TimeEntry, timeEntryStopped } from "../../store/timeEntries/slice";
import {
  CurrentTimeEntryText,
  ElapsedTime,
  IconButtonStyled,
  TopBarStyled
} from "./TopBar.style";
import { TimeEntryEdit } from "../timeEntriesList/TimeEntryEdit";

export const CurrentTimeEntry = ({
  currentTimeEntry,
}: {
  currentTimeEntry: TimeEntry;
}) => {
  const dispatch = useAppDispatch();

  const [elapsedTime, setElapsedTime] = useState<number>(
    currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
  );
  const [isEditVisible, setIsEditVisible] = useState(false);

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

  const handleOnStopClick = () => {
    dispatch(timeEntryStopped(currentTimeEntry.id));
  };

  return (
    <>
      <TopBarStyled>
        <CurrentTimeEntryText title={currentTimeEntry.text}>
          {currentTimeEntry.text}
        </CurrentTimeEntryText>
        <ElapsedTime onClick={() => setIsEditVisible((state) => !state)}>
          {formatElapsedTime(elapsedTime)}
        </ElapsedTime>
        <IconButtonStyled
          onClick={handleOnStopClick}
          size="large"
          color="inherit"
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
