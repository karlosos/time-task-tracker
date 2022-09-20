import { Checkbox } from "@mui/material";
import { formatElapsedTime } from "../../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks";
import {
  timeEntriesLoggedStatusChanged,
  timeEntryAdded,
} from "../../store/timeEntries/slice";
import {
  ElapsedTime,
  TimeEntryRowStyled,
} from "./TimeEntriesList.style";
import { TimeEntry } from "../../store/timeEntries";
import { TimeEntryRow } from "./TimeEntryRow";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntryText } from "../../components/TimeEntryText";
import { ToggleAccordionIcon } from "../../components/ToggleAccordionIcon";

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

export const CombinedTimeEntryRow: React.FC<CombinedTimeEntryRowProps> = ({
  combinedTimeEntry,
}) => {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddTimeEntryClick = () => {
    dispatch(
      timeEntryAdded({ text: combinedTimeEntry.text, startTime: Date.now() })
    );
  };

  const { checkboxState, checkboxIsIndeterminate, handleCheckboxChange } =
    useLoggedCheckbox(combinedTimeEntry);

  return (
    <div className="shadow-[0px_20px_1px_-20px_black] last:shadow-none">
      <TimeEntryRowStyled aria-label="Combined entry row">
        <div
          onClick={() => setIsCollapsed((state) => !state)}
          className="bg-[rgba(171,171,171,0.1)] border border-[#D6D6D6] rounded w-[24px] h-[24px] flex justify-center items-center hover:cursor-pointer font-poppins text-[12px] font-medium mr-2 hover:bg-[rgba(171,171,171,0.2)]"
        >
          {combinedTimeEntry.ids.length}
        </div>
        <TimeEntryText timeEntryText={combinedTimeEntry.text} />

        <div className="flex flex-row flex-grow justify-end items-center space-x-1.5">
          <Checkbox
            style={{
              color: checkboxIsIndeterminate ? '#BDBDBD': "#4B7BE5",
            }}
            checked={checkboxState}
            indeterminate={checkboxIsIndeterminate}
            disabled={checkboxIsIndeterminate}
            onChange={handleCheckboxChange}
            aria-label="is logged status"
          />
          <ElapsedTime className="font-poppins font-medium text-[14px] text-[#363942] w-[65px] text-center opacity-60">
            {formatElapsedTime(combinedTimeEntry.elapsedTime)}
          </ElapsedTime>
          <ToggleAccordionIcon
            onClick={() => setIsCollapsed((state) => !state)}
            aria-label="Combined entry accordion"
            isCollapsed={isCollapsed}
          />
          <PlayCircle
            className="text-[#4B7BE5] hover:cursor-pointer hover:opacity-80"
            onClick={handleAddTimeEntryClick}
          />
        </div>
      </TimeEntryRowStyled>
      {!isCollapsed && (
        <div className="flex flex-col">
          {[...combinedTimeEntry.subEntries].reverse().map((entry) => (
            <TimeEntryRow timeEntry={entry} key={entry.id} />
          ))}
        </div>
      )}
    </div>
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

  return { checkboxState, checkboxIsIndeterminate, handleCheckboxChange };
};
