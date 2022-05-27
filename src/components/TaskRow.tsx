import { Checkbox, IconButton } from "@mui/material";
import { Task } from "../hooks/useTasks";
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
      <div
        title={task.text}
        style={{
          width: '300px',
          maxWidth: '300px',
        }}
      >
        {task.text}
      </div>
      <div
        style={{ flexGrow: 1 }}
      >
        {formatElapsedTime(task.stopTime! - task.startTime)}
      </div>
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
