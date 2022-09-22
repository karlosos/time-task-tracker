import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { formatDatetime, formatElapsedTime } from "../../utils";
import { useAppDispatch } from "../../hooks";
import {
  timeEntriesLoggedStatusChanged,
  TimeEntry,
  timeEntryRemoved,
} from "../../store/timeEntries/slice";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { TimeEntryEdit } from "../../components/TimeEntryEdit";

export const TimeEntryRow = ({ timeEntry }: { timeEntry: TimeEntry }) => {
  const dispatch = useAppDispatch();

  const [isEditVisible, setIsEditVisible] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged([timeEntry.id]));
  };

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const handleRemoveEntry = () => {
    setRemoveDialogOpen(false);
    dispatch(timeEntryRemoved(timeEntry.id));
  };

  return (
    <>
      <div className="flex flex-row items-center" aria-label="Time entry child row">
        <div className="text-sm text-neutral-800 font-medium max-w-[350px] whitespace-nowrap text-ellipsis overflow-hidden">
          {timeEntry.text}
        </div>
        {/* <TimeEntryText timeEntryText={timeEntry.text} /> */}
        <div className="flex flex-row flex-grow justify-end items-center space-x-1.5">
          <Checkbox
            style={{
              color: "#2563eb",
            }}
            checked={timeEntry.logged}
            onChange={handleCheckboxChange}
          />
          <div className="font-medium text-s, text-neutral-800 w-[65px] text-center opacity-60">
            {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
          </div>
          <Edit
            onClick={() => setIsEditVisible((state) => !state)}
            aria-label="Edit entry"
            className="text-neutral-800 hover:opacity-80 hover:cursor-pointer"
          />
          <Delete
            className="text-neutral-800 hover:opacity-80 hover:cursor-pointer"
            onClick={() => setRemoveDialogOpen(true)}
            aria-label="Remove entry"
          />
        </div>
      </div>

      {removeDialogOpen && (
        <RemoveEntryDialog removeDialogOpen={removeDialogOpen} setRemoveDialogOpen={setRemoveDialogOpen} timeEntry={timeEntry} handleRemoveEntry={handleRemoveEntry} />
      )}

      {isEditVisible && (
        <TimeEntryEdit
          setIsEditVisible={setIsEditVisible}
          timeEntry={timeEntry}
        />
      )}
    </>
  );
};

function RemoveEntryDialog({removeDialogOpen, setRemoveDialogOpen, timeEntry, handleRemoveEntry}: {removeDialogOpen: boolean, setRemoveDialogOpen: any, timeEntry: TimeEntry, handleRemoveEntry: () => void}) {
  return <Dialog
    open={removeDialogOpen}
    onClose={() => setRemoveDialogOpen(false)}
  >
    <DialogTitle>Delete entry {timeEntry.text}?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Do you want to delete entry {timeEntry.text} which started in{" "}
        {formatDatetime(timeEntry.startTime)} and ended in{" "}
        {formatDatetime(timeEntry.stopTime!)}.
        {timeEntry.logged && "This entry was already logged!"}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={() => setRemoveDialogOpen(false)}>
        Cancel
      </Button>
      <Button
        onClick={handleRemoveEntry}
        startIcon={<Delete />}
        aria-label="Confirm entry removal"
      >
        Remove
      </Button>
    </DialogActions>
  </Dialog>;
}

