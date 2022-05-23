import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Task, useTasks } from "./useTasks";
import { CurrentTask } from "./components/CurrentTask";
import { NewTask } from "./components/NewTask";
import { TaskRow } from "./components/TaskRow";
import { CombinedTaskRow } from "./components/CombinedTaskRow";

function App() {
  const { tasks, currentTask, addTask, editTask } = useTasks();
  const [isCollapsedMode, setIsCollapsedMode] = useState(false);

  const [elapsedTime, setElapsedTime] = useState<number>(
    currentTask ? Date.now() - currentTask.startTime : 0
  );

  const tasksToRender = Object.values(tasks)
    .filter((task) => task.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!);

  const combinedTasks = tasksToRender.reduce<any[]>((acc, curr) => {
    const found = acc.find((el) => el.text === curr.text);
    const diff = curr.stopTime! - curr.startTime;
    if (found) {
      found.elapsedTime = found.elapsedTime + diff;
    } else {
      acc.push({
        text: curr.text,
        elapsedTime: diff,
      });
    }

    return acc;
  }, []);

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
          <CombinedTaskRow combinedTask={combinedTask} addNewTask={addTask} />
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
            elapsedTime={elapsedTime}
            onStopClick={handleStopClick}
          />
        ) : (
          <NewTask addNewTask={addTask} tasks={Object.values(tasks)} />
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
