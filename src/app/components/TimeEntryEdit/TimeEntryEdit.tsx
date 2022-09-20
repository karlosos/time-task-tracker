import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntry, timeEntryUpdated } from "../../store/timeEntries";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";
import {
  ActionButtonContainer,
  EditFieldsContainer,
} from "./TimeEntryEdit.style";
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
    <div className='mt-2 mb-2'>
      <EditFieldsContainer>
        <TextField
          label="Current entry text"
          value={entryText}
          onChange={handleTextChange}
          style={{ flexGrow: "1", fontFamily: 'Poppins' }}
          className="font-poppins font-medium"
        />
        <div data-testid={testId.startTime}>
          <DatePicker
            className="border border-[rgba(0,0,0,0.23)] hover:border-black rounded focus:outline-blue-500 font-poppins"
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
            className="border border-[rgba(0,0,0,0.23)] hover:border-black rounded focus:outline-blue-500 font-poppins"
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
      </EditFieldsContainer>
      <ActionButtonContainer>
        <button onClick={handleCancel} className="bg-white border-2 border-[#4B7BE5] rounded text-[#4B7BE5] hover:opacity-50 px-3 py-1.5 font-poppins font-medium">Cancel</button>
        <button onClick={handleSave} className="bg-[#4B7BE5] rounded text-white hover:opacity-50 px-3 py-1.5 font-poppins font-medium">Save</button>
      </ActionButtonContainer>
    </div>
  );
};
