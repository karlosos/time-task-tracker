import { Checkbox } from "@mui/material";
import { formatElapsedTime } from "../../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks";
import {
  timeEntriesLoggedStatusChanged,
  timeEntryAdded,
} from "../../store/timeEntries/slice";
import { ElapsedTime, IconButtonStyled, TimeEntryRowStyled, TimeEntryText } from "./TimeEntriesList.style";

export const CombinedTimeEntryRow = ({
  combinedTimeEntry,
}: {
  combinedTimeEntry: {
    text: string;
    ids: string[];
    elapsedTime: number;
    logged: boolean[];
    date: string;
  };
}) => {
  const dispatch = useAppDispatch();

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
    <TimeEntryRowStyled>
      <TimeEntryText title={combinedTimeEntry.text}>
        {combinedTimeEntry.text}
      </TimeEntryText>
      <ElapsedTime>
        {formatElapsedTime(combinedTimeEntry.elapsedTime)}
      </ElapsedTime>
      <IconButtonStyled
        size="large"
        edge="start"
        color="inherit"
        onClick={handleAddTimeEntryClick}
      >
        <PlayCircle />
      </IconButtonStyled>
      <Checkbox
        checked={checkboxState}
        indeterminate={checkboxIsIndeterminate}
        disabled={checkboxIsIndeterminate}
        onChange={handleCheckboxChange}
      />
    </TimeEntryRowStyled>
  );
};