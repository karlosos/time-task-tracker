import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useState } from "react";
import { Task, useTasks } from "./useTasks";
import { CurrentTask } from "./components/CurrentTask";
import { NewTask } from "./components/NewTask";
import { TaskRow } from "./components/TaskRow";
import { CombinedTaskRow } from "./components/CombinedTaskRow";

function App() {
  const { tasks, currentTask, addTask, editTask, toggleLogged } = useTasks();
  const [isCollapsedMode, setIsCollapsedMode] = useState(false);


  const tasksToRender = Object.values(tasks)
    .filter((task) => task.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!);

  const combinedTasks = tasksToRender.reduce<any[]>((acc, curr) => {
    const found = acc.find((el) => el.text === curr.text);
    const diff = curr.stopTime! - curr.startTime;
    if (found) {
      found.elapsedTime = found.elapsedTime + diff;
      found.ids.push(curr.id);
      found.logged.push(curr.logged);
    } else {
      acc.push({
        text: curr.text,
        ids: [curr.id],
        elapsedTime: diff,
        logged: [curr.logged],
      });
    }

    return acc;
  }, []);


  const handleStopClick = () => {
    if (!currentTask) {
      return;
    }

    const editedTask: Task = {
      ...currentTask,
      stopTime: Date.now(),
    };

    editTask(editedTask);
  };

  const renderTasks = () => {
    if (isCollapsedMode) {
      return combinedTasks.map((combinedTask) => (
          <CombinedTaskRow combinedTask={combinedTask} addNewTask={addTask} toggleLogged={toggleLogged} />
        ))
    } else {
      return tasksToRender.map((task) => (
          <TaskRow task={task} addNewTask={addTask} editTask={editTask} />
        ))
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {currentTask ? (
          <CurrentTask
            currentTask={currentTask}
            onStopClick={handleStopClick}
          />
        ) : (
          <NewTask addNewTask={addTask} />
        )}
      </Box>
      <hr />
      <button onClick={() => setIsCollapsedMode((state) => !state)}>
        {isCollapsedMode ? "Extend tasks" : "Collapse tasks"}
      </button>
      <Box sx={{ flexGrow: 1 }}>
        {renderTasks()}
      </Box>
    </Container>
  );
}

export default App;
