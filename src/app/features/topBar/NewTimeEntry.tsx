import AddIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { timeEntryAdded } from "../../store/timeEntries/slice";
import {
  TopBarStyled,
} from "./TopBar.style";

export const NewTimeEntry = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    dispatch(timeEntryAdded({ text: text, startTime: Date.now() }));
  };

  return (
    <TopBarStyled className="hover:border-neutral-200">
      <div className="flex-grow">
        <input
          className="bg-neutral-100 rounded-lg text-neutral-800 px-3 py-2 focus:outline-none text-lg font-medium w-full"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="new entry text"
        />
      </div>
      <div className="text-green-400">
        <IconButton
          onClick={handleAddClick}
          size="large"
          color="inherit"
          aria-label="add entry"
          disabled={text === ""}
        >
          <AddIcon />
        </IconButton>
      </div>
    </TopBarStyled>
  );
};
