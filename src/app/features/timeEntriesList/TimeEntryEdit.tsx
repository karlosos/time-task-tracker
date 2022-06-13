import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntry, timeEntryUpdated } from "../../store/timeEntries"

export const TimeEntryEdit = ({ timeEntry, setIsEditVisible }: { timeEntry: TimeEntry, setIsEditVisible: (flag: boolean) => void}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsEditVisible(false);
  };

  const handleSave = () => {
    console.log('>> save timeEntry', startTimeValue, stopTimeValue, entryText)
    dispatch(timeEntryUpdated({
      id: timeEntry.id,
      changes: {
        startTime: startTimeValue,
        stopTime: stopTimeValue,
        text: entryText,
      }
    }))
    setIsEditVisible(false);
  }

  const [startTimeValue, setStartTimeValue] = useState<number>(timeEntry.startTime);
  const [stopTimeValue, setStopTimeValue] = useState<number | undefined>(timeEntry.stopTime);
  const [entryText, setEntryText] = useState<string>(timeEntry.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryText(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TextField label="Entry text" value={entryText} onChange={handleTextChange} /> 
      <br />
      <br />

      <TimePicker
        label="Start Time"
        value={startTimeValue}
        ampm={false}
        onChange={(newValue: Date | null) => {
          newValue && setStartTimeValue(newValue.getTime());
        }}
        renderInput={(params) => <TextField {...params} />}
      /> 
      {' '}
      <TimePicker
        label="Stop Time"
        value={stopTimeValue}
        disabled={!stopTimeValue}
        ampm={false}
        onChange={(newValue: Date | null) => {
          newValue && setStopTimeValue(newValue.getTime());
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <br />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </LocalizationProvider>
  )
}