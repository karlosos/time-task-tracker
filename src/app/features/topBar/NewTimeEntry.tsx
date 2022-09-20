import AddIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { timeEntryAdded } from "../../store/timeEntries/slice";
import {
  IconButtonStyled,
  NewTimeEntryInputWrapper,
  TopBarStyled,
} from "./TopBar.style";

export const NewTimeEntry = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    dispatch(timeEntryAdded({ text: text, startTime: Date.now() }));
  };

  return (
    <TopBarStyled className="hover:border-[#EEEEEE]">
      <NewTimeEntryInputWrapper>
        <input
          className="bg-[#F5F5F5] rounded rounded-lg text-[#363942] px-3 py-2 focus:outline-none text-[18px] font-poppins font-medium w-[450px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="new entry text"
        />
      </NewTimeEntryInputWrapper>
      <div className="text-green-400">
        <IconButtonStyled
          onClick={handleAddClick}
          size="large"
          color="inherit"
          aria-label="add entry"
          disabled={text === ""}
          style={{ marginRight: "0" }}
        >
          <AddIcon />
        </IconButtonStyled>
      </div>
    </TopBarStyled>
  );
};
