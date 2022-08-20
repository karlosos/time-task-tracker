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
} from "./TimeEntriesList.style";
import { TimeEntry } from "../../store/timeEntries";
import { TimeEntryRow } from "./TimeEntryRow";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntryText } from "../../components/TimeEntryText";

interface CombinedTimeEntry {
    text: string;
    ids: string[];
    subEntries: TimeEntry[];
    elapsedTime: number;
    logged: boolean[];
    date: string;
  }

interface CombinedTimeEntryRowProps {
  combinedTimeEntry: CombinedTimeEntry;
}

export const CombinedTimeEntryRow: React.FC<CombinedTimeEntryRowProps> = ({ combinedTimeEntry }) => {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddTimeEntryClick = () => {
    dispatch(
      timeEntryAdded({ text: combinedTimeEntry.text, startTime: Date.now() })
    );
  };

  const { checkboxState, checkboxIsIndeterminate, handleCheckboxChange } = useLoggedCheckbox(combinedTimeEntry)

  return (
    <>
      <TimeEntryRowStyled>
        <div onClick={() => setIsCollapsed((state) => !state)}>
          {combinedTimeEntry.ids.length} &nbsp;
        </div>
        <TimeEntryText timeEntryText={combinedTimeEntry.text} />
        <ElapsedTime>
          {formatElapsedTime(combinedTimeEntry.elapsedTime)}
        </ElapsedTime>
        <Checkbox
          checked={checkboxState}
          indeterminate={checkboxIsIndeterminate}
          disabled={checkboxIsIndeterminate}
          onChange={handleCheckboxChange}
          aria-label='is logged status'
        />
        <IconButtonStyled
          size="large"
          edge="start"
          color="inherit"
          onClick={() => setIsCollapsed((state) => !state)}
          aria-label='combined entry accordion'
        >
          {isCollapsed ? <ArrowDownward /> : <ArrowUpward />}
        </IconButtonStyled>
        <IconButtonStyled
          size="large"
          edge="start"
          color="inherit"
          onClick={handleAddTimeEntryClick}
          aria-label='add time entry'
        >
          <PlayCircle />
        </IconButtonStyled>
      </TimeEntryRowStyled>
      {!isCollapsed &&
        [...combinedTimeEntry.subEntries]
          .reverse()
          .map((entry) => <TimeEntryRow timeEntry={entry} key={entry.id} />)}
    </>
  );
};

const useLoggedCheckbox = (combinedTimeEntry: CombinedTimeEntry) => {
  const dispatch = useDispatch();

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

  return { checkboxState, checkboxIsIndeterminate, handleCheckboxChange}
}