import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntry, timeEntryUpdated } from "../../store/timeEntries";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";
import { testId } from "../../testUtils/testId";

interface TimeEntryEditProps {
  timeEntry: TimeEntry;
  setIsEditVisible: (flag: boolean) => void;
}

export const TimeEntryEdit: React.FC<TimeEntryEditProps> = ({
  timeEntry,
  setIsEditVisible,
}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsEditVisible(false);
  };

  const handleSave = () => {
    dispatch(
      timeEntryUpdated({
        id: timeEntry.id,
        changes: {
          startTime: startTimeValue,
          stopTime: stopTimeValue,
          text: entryText,
        },
      })
    );
    setIsEditVisible(false);
  };

  const [startTimeValue, setStartTimeValue] = useState<number>(
    timeEntry.startTime
  );
  const [stopTimeValue, setStopTimeValue] = useState<number | undefined>(
    timeEntry.stopTime
  );
  const [entryText, setEntryText] = useState<string>(timeEntry.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryText(event.target.value);
  };

  return (
    <div className='mt-4 mb-2'>
      <div className='flex flex-row gap-[10px]'>
        <TextField
          label="Current entry text"
          value={entryText}
          onChange={handleTextChange}
          className='flex-grow'
        />
        <div data-testid={testId.startTime}>
          <DatePicker
            className="border border-gray_border rounded hover:border-black focus:outline-blue-500"
            selected={new Date(startTimeValue)}
            wrapperClassName={styles.date_picker}
            onChange={(date: Date) =>
              date && setStartTimeValue(date?.getTime())
            }
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
        <div data-testid={testId.stopTime}>
          <DatePicker
            className="border border-gray_border rounded hover:border-black focus:outline-blue-500"
            disabled={!stopTimeValue}
            wrapperClassName={styles.date_picker}
            selected={
              stopTimeValue ? new Date(stopTimeValue) : new Date(Date.now())
            }
            onChange={(date: Date) => date && setStopTimeValue(date?.getTime())}
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
      </div>
      <div className='pt-[10px] flex flex-row justify-end gap-[10px]'>
        <button onClick={handleCancel} className="bg-white border-2 border-blue-600 rounded text-blue-600 hover:text-blue-800 hover:border-blue-800 px-3 py-1.5 font-medium">Cancel</button>
        <button onClick={handleSave} className="bg-blue-600 rounded text-white hover:bg-blue-800 px-3 py-1.5 font-medium">Save</button>
      </div>
    </div>
  );
};
