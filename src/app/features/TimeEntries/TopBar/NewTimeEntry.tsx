import AddIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { timeEntryAdded } from "../store";
import { TopBarStyled } from "./TopBar.style";

export const NewTimeEntry = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    dispatch(timeEntryAdded({ text: text, startTime: Date.now() }));
  };

  useKeyPress(handleAddClick, ["Enter"], ref);

  return (
    <div
      className={`rounded-lg border border-transparent bg-white transition-none`}
    >
      <TopBarStyled className="hover:border-neutral-200" ref={ref}>
        <div className="flex-grow">
          <input
            className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-lg font-medium text-neutral-800 focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="new entry text"
          />
        </div>
        <div className="mr-2 text-green-400">
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
    </div>
  );
};
