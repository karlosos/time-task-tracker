import AddIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { timeEntryAdded } from "../../store/timeEntries/slice";
import { IconButtonStyled, NewTimeEntryInput, NewTimeEntryInputWrapper } from "./TopBar.style";

export const NewTimeEntry = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    dispatch(timeEntryAdded({text: text, startTime: Date.now()}))
  };

  return (
    <>
      <NewTimeEntryInputWrapper>
        <NewTimeEntryInput
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </NewTimeEntryInputWrapper>
      <IconButtonStyled
        onClick={handleAddClick}
        size="large"
        color="inherit"
      >
        <AddIcon />
      </IconButtonStyled>
    </>
  );
};
