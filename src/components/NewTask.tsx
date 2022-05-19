import { IconButton, TextField } from "@mui/material";
import { Task } from "../useTasks";
import AddIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

export const NewTask = ({
  tasks,
  onAddClick,
}: {
  tasks: Task[];
  onAddClick: () => void;
}) => {
  const [text, setText] = useState<string>("");

  return (
    <>
      <Autocomplete
        sx={{ width: "300px" }}
        disableClearable
        options={tasks.map((option) => option.text)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard" 
            label="New task"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <IconButton
        onClick={onAddClick}
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
