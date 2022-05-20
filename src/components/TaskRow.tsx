import { Checkbox, IconButton, Typography } from "@mui/material";
import { Task } from "../useTasks";
import { formatElapsedTime } from "../utils";
import { PlayCircle } from "@mui/icons-material";

export const TaskRow = ({
  task,
  addNewTask,
  editTask,
}: {
  task: Task;
  addNewTask: (text: string, startTime: number) => void;
  editTask: (task: Task) => void;
}) => {
  const handleAddTaskClick = () => {
    addNewTask(task.text, Date.now());
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editTask({
      ...task,
      logged: e.target.checked,
    })
  }

  return (
    <div
      key={task.id}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <Typography
        title={task.text}
        variant="h6"
        component="div"
        sx={{
          minWidth: "350px",
          maxWidth: "350px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {task.text}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {formatElapsedTime(task.stopTime! - task.startTime)}
      </Typography>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleAddTaskClick}
      >
        <PlayCircle />
      </IconButton>
      <Checkbox checked={task.logged} onChange={handleCheckboxChange} />
    </div>
  );
};
