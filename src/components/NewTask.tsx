import { IconButton, TextField } from "@mui/material";
import { Task } from "../useTasks";
import AddIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

export const NewTask = ({
  tasks,
  addNewTask,
}: {
  tasks: Task[];
  addNewTask: (text: string, startTime: number) => void;
}) => {
  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    addNewTask(text, Date.now())
  }

  return (
    <>
      <Autocomplete
        sx={{ width: "300px", backgroundColor: 'white' }}
        freeSolo
        disableClearable
        options={tasks.map((option) => option.text)}
        value={text}
        defaultValue={text}
        onChange={(_, value) => value && setText(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard" 
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
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
