import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";
import { testId } from "../../../../testUtils/testId";
import { TimeEntry, timeEntryUpdated } from "../../store";
import { Button } from "../../../../ui/Button";

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
      }),
    );
    setIsEditVisible(false);
  };

  const [startTimeValue, setStartTimeValue] = useState<number>(
    timeEntry.startTime,
  );
  const [stopTimeValue, setStopTimeValue] = useState<number | undefined>(
    timeEntry.stopTime,
  );
  const [entryText, setEntryText] = useState<string>(timeEntry.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryText(event.target.value);
  };

  return (
    <div className="mb-2 mt-4">
      <div className="flex flex-row gap-[10px]">
        <TextField
          label="Current entry text"
          value={entryText}
          onChange={handleTextChange}
          className="flex-grow"
        />
        <div data-testid={testId.startTime}>
          <DatePicker
            portalId="root-portal"
            className="border-gray_border rounded border hover:border-black focus:outline-blue-500"
            selected={new Date(startTimeValue)}
            wrapperClassName={styles.date_picker}
            onChange={(date: Date | null) =>
              date ? setStartTimeValue(date.getTime()) : null
            }
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
        <div data-testid={testId.stopTime}>
          <DatePicker
            portalId="root-portal"
            className="border-gray_border rounded border hover:border-black focus:outline-blue-500"
            disabled={!stopTimeValue}
            wrapperClassName={styles.date_picker}
            selected={
              stopTimeValue ? new Date(stopTimeValue) : new Date(Date.now())
            }
            onChange={(date: Date | null) =>
              date ? setStopTimeValue(date.getTime()) : null
            }
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-[10px] pt-[10px]">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};
