import { Checkbox, IconButton } from "@mui/material";
import { Task } from "../useTasks";
import { formatElapsedTime } from "../utils";
import { PlayCircle } from "@mui/icons-material";

export const CombinedTaskRow = ({
  combinedTask,
  addNewTask,
}: {
  combinedTask: {text: string, elapsedTime: number};
  addNewTask: (text: string, startTime: number) => void;
}) => {
  const handleAddTaskClick = () => {
    addNewTask(combinedTask.text, Date.now());
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // editTask({
    //   ...task,
    //   logged: e.target.checked,
    // })
  }

  return (
    <div
      key={combinedTask.text}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <div
        title={combinedTask.text}
        style={{
          width: '300px',
          maxWidth: '300px',
        }}
      >
        {combinedTask.text}
      </div>
      <div
        style={{ flexGrow: 1 }}
      >
        {formatElapsedTime(combinedTask.elapsedTime)}
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
      {/* <Checkbox checked={combinedTask.logged} onChange={handleCheckboxChange} /> */}
    </div>
  );
};
