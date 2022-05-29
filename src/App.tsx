import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useState } from "react";
import { Task, useTasks } from "./hooks/useTasks";
import { CurrentTask } from "./components/CurrentTask";
import { NewTask } from "./components/NewTask";
import { TaskRow } from "./components/TaskRow";
import { CombinedTaskRow } from "./components/CombinedTaskRow";
import { useAppSelector, useAppDispatch } from "./hooks/storeHooks";
import { increment } from "./timeEntriesSlice";

function App() {
  const {
    tasksByDate,
    combinedTasks,
    currentTask,
    addTask,
    editTask,
    toggleLogged,
  } = useTasks();
  const [isCollapsedMode, setIsCollapsedMode] = useState(false);
  const count = useAppSelector((state) => state.timeEntries.value);
  const dispatch = useAppDispatch();

  const handleStopClick = () => {
    dispatch(increment())
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
      return Object.entries(combinedTasks)
      .sort((a, b) => a[0] > b[0] ? -1 : 1)
      .map(
        ([date, combinedTasksPerDate]: any[]) => {
          return (
            <>
              {date}
              {combinedTasksPerDate.map((combinedTask: any) => (
                <CombinedTaskRow
                  combinedTask={combinedTask}
                  addNewTask={addTask}
                  toggleLogged={toggleLogged}
                />
              ))}
            </>
          );
        }
      );
    } else {
      return Object.entries(tasksByDate).map(([date, tasksPerDate]: any[]) => {
        return (
          <>
            {date}
            {tasksPerDate
            .map((task: Task) => (
              <TaskRow task={task} addNewTask={addTask} editTask={editTask} />
            ))}
          </>
        );
      });
    }
  };

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
      <Box sx={{ flexGrow: 1 }}>{renderTasks()}</Box>
    </Container>
  );
}

export default App;
