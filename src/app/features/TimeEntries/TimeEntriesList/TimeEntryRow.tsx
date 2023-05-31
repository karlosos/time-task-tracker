import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { formatDatetime, formatElapsedTime } from "../../../utils";
import { useAppDispatch } from "../../../hooks";
import { useState } from "react";
import { TimeEntryEdit } from "../components/TimeEntryEdit";
import {
  timeEntriesLoggedStatusChanged,
  TimeEntry,
  timeEntryRemoved,
} from "../store";
import { Edit2, Trash } from "lucide-react";
import { Button } from "../../../ui/Button";

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
      <div
        className="flex flex-row items-center"
        aria-label="Time entry child row"
      >
        <div className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-neutral-800">
          {timeEntry.text}
        </div>
        <div className="flex flex-grow flex-row items-center justify-end space-x-1.5">
          <Checkbox
            style={{
              color: "#2563eb",
            }}
            checked={timeEntry.logged}
            onChange={handleCheckboxChange}
          />
          <div className="w-[65px] text-center text-sm font-medium text-neutral-800 opacity-60">
            {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
          </div>
          <Button variant={"ghost"} className="h-8 w-8 p-2">
            <Edit2
              onClick={() => setIsEditVisible((state) => !state)}
              aria-label="Edit entry"
            />
          </Button>
          <Button variant={"ghost"} className="h-8 w-8 p-2 hover:bg-rose-50">
            <Trash
              onClick={() => setRemoveDialogOpen(true)}
              aria-label="Remove entry"
            />
          </Button>
        </div>
      </div>

      {removeDialogOpen && (
        <RemoveEntryDialog
          removeDialogOpen={removeDialogOpen}
          setRemoveDialogOpen={setRemoveDialogOpen}
          timeEntry={timeEntry}
          handleRemoveEntry={handleRemoveEntry}
        />
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

function RemoveEntryDialog({
  removeDialogOpen,
  setRemoveDialogOpen,
  timeEntry,
  handleRemoveEntry,
}: {
  removeDialogOpen: boolean;
  setRemoveDialogOpen: any;
  timeEntry: TimeEntry;
  handleRemoveEntry: () => void;
}) {
  return (
    <Dialog open={removeDialogOpen} onClose={() => setRemoveDialogOpen(false)}>
      <DialogTitle>Delete entry {timeEntry.text}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete entry {timeEntry.text} which started in{" "}
          {formatDatetime(timeEntry.startTime)} and ended in{" "}
          {formatDatetime(timeEntry.stopTime!)}.
          {timeEntry.logged && "This entry was already logged!"}
        </DialogContentText>
      </DialogContent>
      <div className="mx-6 mb-6 flex flex-row justify-end gap-[10px] pt-[10px]">
        <Button
          onClick={() => setRemoveDialogOpen(false)}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          onClick={handleRemoveEntry} 
          aria-label="Confirm entry romoval"
        >
          Remove
        </Button>
      </div>
    </Dialog>
  );
}
