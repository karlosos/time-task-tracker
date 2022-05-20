import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Task, useTasks } from "./useTasks";
import { CurrentTask } from "./components/CurrentTask";
import { NewTask } from "./components/NewTask";
import { TaskRow } from "./components/TaskRow";

function App() {
  const { tasks, currentTask, addTask, editTask } = useTasks();

  const [elapsedTime, setElapsedTime] = useState<number>(
    currentTask ? Date.now() - currentTask.startTime : 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(currentTask ? Date.now() - currentTask.startTime : 0);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const handleStopClick = () => {
    if (!currentTask) {
      console.log("Current task not visible");
      return;
    }

    const editedTask: Task = {
      ...currentTask,
      stopTime: Date.now(),
    };

    editTask(editedTask);

    console.log(">> tasks", tasks);
    console.log(">> currentTask", currentTask);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {currentTask ? (
              <CurrentTask
                currentTask={currentTask}
                elapsedTime={elapsedTime}
                onStopClick={handleStopClick}
              />
            ) : (
              <NewTask addNewTask={addTask} tasks={Object.values(tasks)} />
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {Object.values(tasks)
          .filter((task) => task.stopTime)
          .sort((a, b) => b.stopTime! - a.stopTime!)
          .map((task) => (
            <TaskRow task={task} addNewTask={addTask} editTask={editTask} />
          ))}
      </Box>
    </Container>
  );
}

export default App;
