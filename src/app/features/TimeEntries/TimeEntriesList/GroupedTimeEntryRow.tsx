import { Checkbox } from "@mui/material";
import { formatElapsedTime } from "../../../utils";
import { PlayCircle } from "@mui/icons-material";
import { useAppDispatch } from "../../../hooks";
import { TimeEntryRow } from "./TimeEntryRow";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntryText } from "../components/TimeEntryText";
import { ToggleAccordionIcon } from "../../../ui/ToggleAccordionIcon";
import {
  GroupedTimeEntry,
  timeEntriesLoggedStatusChanged,
  timeEntryAdded,
} from "../store";
import { Button } from "../../../ui/Button";

interface GroupedTimeEntryRowProps {
  groupedTimeEntry: GroupedTimeEntry;
}

export const GroupedTimeEntryRow: React.FC<GroupedTimeEntryRowProps> = ({
  groupedTimeEntry: groupedTimeEntry,
}) => {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddTimeEntryClick = () => {
    dispatch(
      timeEntryAdded({ text: groupedTimeEntry.text, startTime: Date.now() })
    );
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((state) => !state);
  };

  const { checkboxState, checkboxIsIndeterminate, handleCheckboxChange } =
    useLoggedCheckbox(groupedTimeEntry);

  return (
    <div className="shadow-[0px_20px_1px_-20px_black] last:shadow-none">
      <div
        className="flex flex-row items-center"
        aria-label="Grouped entry row"
      >
        <SubEntriesCount
          onClick={handleToggleCollapse}
          groupedTimeEntry={groupedTimeEntry}
        />
        <TimeEntryText timeEntryText={groupedTimeEntry.text} />
        <div className="flex flex-grow flex-row items-center justify-end space-x-1.5">
          <Checkbox
            style={{
              color: checkboxIsIndeterminate ? "#BDBDBD" : "#2563eb",
            }}
            checked={checkboxState}
            indeterminate={checkboxIsIndeterminate}
            disabled={checkboxIsIndeterminate}
            onChange={handleCheckboxChange}
            aria-label="is logged status"
          />
          <div className="w-[65px] text-center text-sm font-medium text-neutral-800 opacity-60">
            {formatElapsedTime(groupedTimeEntry.elapsedTime)}
          </div>
          <ToggleAccordionIcon
            onClick={handleToggleCollapse}
            aria-label="Grouped entry accordion"
            isCollapsed={isCollapsed}
          />
          <Button
            variant={"ghost"}
            className="h-8 w-8 p-2"
            onClick={handleAddTimeEntryClick}
          >
            <PlayCircle className="text-blue-600" />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          {[...groupedTimeEntry.subEntries].reverse().map((entry) => (
            <TimeEntryRow timeEntry={entry} key={entry.id} />
          ))}
        </div>
      )}
    </div>
  );
};

const useLoggedCheckbox = (groupedTimeEntry: GroupedTimeEntry) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged(groupedTimeEntry.ids));
  };

  let checkboxState = true;
  let checkboxIsIndeterminate = false;

  if (groupedTimeEntry.logged.every((a) => a === true)) {
    checkboxState = true;
  } else if (groupedTimeEntry.logged.every((a) => a === false)) {
    checkboxState = false;
  } else {
    checkboxIsIndeterminate = true;
  }

  return { checkboxState, checkboxIsIndeterminate, handleCheckboxChange };
};

function SubEntriesCount({
  onClick,
  groupedTimeEntry,
}: {
  onClick: () => void;
  groupedTimeEntry: GroupedTimeEntry;
}) {
  return (
    <div
      onClick={onClick}
      className="mr-2 flex h-6 w-6 shrink-0 select-none items-center justify-center rounded border border-neutral-300 bg-neutral-100 text-xs font-medium hover:cursor-pointer hover:bg-neutral-200"
    >
      {groupedTimeEntry.ids.length}
    </div>
  );
}
