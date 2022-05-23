import { IconButton } from "@mui/material";
import { Task } from "../useTasks";
import AddIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";

export const NewTask = ({
  tasks,
  addNewTask,
}: {
  tasks: Task[];
  addNewTask: (text: string, startTime: number) => void;
}) => {
  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    addNewTask(text, Date.now());
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
