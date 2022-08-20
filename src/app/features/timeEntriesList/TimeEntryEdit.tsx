import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimeEntry, timeEntryUpdated } from "../../store/timeEntries";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";
import styled from "@emotion/styled";

const EditFieldsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
`;
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
    <>
      <EditFieldsContainer>
        <TextField
          label="Current entry text"
          value={entryText}
          onChange={handleTextChange}
          style={{flexGrow: '1'}}
        />
        <div>
          <DatePicker
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
        <div>
          <DatePicker
            disabled={!stopTimeValue}
            wrapperClassName={styles.date_picker}
            selected={new Date(stopTimeValue!)}
            onChange={(date: Date) => date && setStopTimeValue(date?.getTime())}
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
      </EditFieldsContainer>
      <br />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  );
};
