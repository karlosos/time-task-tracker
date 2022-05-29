import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { timeEntryAdded } from "../timeEntriesSlice";

export const NewTimeEntry = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    dispatch(timeEntryAdded({text: text, startTime: Date.now()}))
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "300px", maxWidth: "300px" }}
        />
      </div>
      <IconButton
        onClick={handleAddClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};
