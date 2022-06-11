import { Checkbox } from "@mui/material";
import { formatElapsedTime } from "../../utils";
import { ArrowUpward, ArrowDownward, PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks";
import {
  timeEntriesLoggedStatusChanged,
  timeEntryAdded,
} from "../../store/timeEntries/slice";
import {
  ElapsedTime,
  IconButtonStyled,
  TimeEntryRowStyled,
  TimeEntryText,
} from "./TimeEntriesList.style";
import { TimeEntry } from "../../store/timeEntries";
import { TimeEntryRow } from "./TimeEntryRow";
import { useState } from "react";

export const CombinedTimeEntryRow = ({
  combinedTimeEntry,
}: {
  combinedTimeEntry: {
    text: string; 
    ids: string[];
    subEntries: TimeEntry[];
    elapsedTime: number;
    logged: boolean[];
    date: string;
  };
}) => {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    <>
      <TimeEntryRowStyled>
        <div onClick={() => setIsCollapsed(state => !state)}>
          {combinedTimeEntry.ids.length} &nbsp;
        </div>
        <TimeEntryText title={combinedTimeEntry.text}>
          {combinedTimeEntry.text}
        </TimeEntryText>
        <ElapsedTime>
          {formatElapsedTime(combinedTimeEntry.elapsedTime)}
        </ElapsedTime>
        <Checkbox
          checked={checkboxState}
          indeterminate={checkboxIsIndeterminate}
          disabled={checkboxIsIndeterminate}
          onChange={handleCheckboxChange}
        />
        <IconButtonStyled
          size="large"
          edge="start"
          color="inherit"
          onClick={() => setIsCollapsed((state) => !state)}
        >
          {isCollapsed ? <ArrowDownward/> : <ArrowUpward/>}
        </IconButtonStyled>
        <IconButtonStyled
          size="large"
          edge="start"
          color="inherit"
          onClick={handleAddTimeEntryClick}
        >
          <PlayCircle />
        </IconButtonStyled>
      </TimeEntryRowStyled>
      {!isCollapsed &&
        [...combinedTimeEntry.subEntries].reverse().map((entry) => (
          <TimeEntryRow timeEntry={entry} key={entry.id} />
        ))}
    </>
  );
};
