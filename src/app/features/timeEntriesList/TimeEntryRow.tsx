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
import {
  ElapsedTime,
  IconButtonStyled,
  TimeEntryRowStyled,
} from "./TimeEntriesList.style";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { TimeEntryEdit } from "../../components/TimeEntryEdit";
import { TimeEntryText } from "../../components/TimeEntryText";

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
      <TimeEntryRowStyled aria-label="Time entry child row">
        <div className="font-poppins text-[14px] text-[#363942] font-medium max-w-[350px] whitespace-nowrap text-ellipsis overflow-hidden">
          {timeEntry.text}
        </div>
        {/* <TimeEntryText timeEntryText={timeEntry.text} /> */}
        <div className="flex flex-row flex-grow justify-end items-center space-x-1.5">
          <Checkbox
            style={{
              color: "#4B7BE5",
            }}
            checked={timeEntry.logged}
            onChange={handleCheckboxChange}
          />
          <ElapsedTime className="font-poppins font-medium text-[14px] text-[#363942] w-[65px] text-center opacity-60">
            {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
          </ElapsedTime>
          <Edit
            onClick={() => setIsEditVisible((state) => !state)}
            aria-label="Edit entry"
            className="text-[#363942] hover:opacity-80 hover:cursor-pointer"
          />
          <Delete
            className="text-[#363942] hover:opacity-80 hover:cursor-pointer"
            onClick={() => setRemoveDialogOpen(true)}
            aria-label="Remove entry"
          />
        </div>
      </TimeEntryRowStyled>

      {removeDialogOpen && (
        <Dialog
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
        </Dialog>
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
