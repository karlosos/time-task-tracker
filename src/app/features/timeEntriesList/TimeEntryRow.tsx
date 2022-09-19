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
        <TimeEntryText timeEntryText={timeEntry.text} />
        <ElapsedTime>
          {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
        </ElapsedTime>
        <Checkbox checked={timeEntry.logged} onChange={handleCheckboxChange} />
        <IconButtonStyled
          size="large"
          edge="start"
          color="inherit"
          onClick={() => setIsEditVisible((state) => !state)}
          aria-label="Edit entry"
        >
          <Edit />
        </IconButtonStyled>
        <IconButtonStyled
          size="large"
          edge="start"
          color="inherit"
          onClick={() => setRemoveDialogOpen(true)}
          aria-label="Remove entry"
        >
          <Delete />
        </IconButtonStyled>
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
