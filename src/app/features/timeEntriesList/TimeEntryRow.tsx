import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { formatDatetime, formatElapsedTime } from "../../utils";
import { useAppDispatch } from "../../hooks";
import {
  timeEntriesLoggedStatusChanged,
  TimeEntry,
  timeEntryRemoved
} from "../../store/timeEntries/slice";
import {
  ElapsedTime,
  IconButtonStyled,
  TimeEntryRowStyled,
  TimeEntryText,
} from "./TimeEntriesList.style";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";

export const TimeEntryRow = ({ timeEntry }: { timeEntry: TimeEntry }) => {
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(timeEntriesLoggedStatusChanged([timeEntry.id]));
  };

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  
  const handleRemoveEntry = () => {
    setRemoveDialogOpen(false);
    dispatch(timeEntryRemoved(timeEntry.id));
  }

  return (
    <>
    <TimeEntryRowStyled>
      <TimeEntryText title={timeEntry.text}>{timeEntry.text}</TimeEntryText>
      <ElapsedTime>
        {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
      </ElapsedTime>
      <Checkbox checked={timeEntry.logged} onChange={handleCheckboxChange} />
      <IconButtonStyled
        size="large"
        edge="start"
        color="inherit"
        onClick={() => undefined}
      >
        <Edit />
      </IconButtonStyled>
      <IconButtonStyled
        size="large"
        edge="start"
        color="inherit"
        onClick={() => setRemoveDialogOpen(true)}
      >
        <Delete />
      </IconButtonStyled>
    </TimeEntryRowStyled>

    <Dialog
      open={removeDialogOpen} 
      onClose={() => setRemoveDialogOpen(false)}
    >
      <DialogTitle>
        Delete entry {timeEntry.text}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete entry {timeEntry.text} which started in {formatDatetime(timeEntry.startTime)} and ended in {formatDatetime(timeEntry.stopTime!)}.
          {timeEntry.logged && 'This entry was already logged!'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setRemoveDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleRemoveEntry} startIcon={<Delete />}>Remove</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};
