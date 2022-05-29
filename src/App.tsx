import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useState } from "react";
import { CurrentTask } from "./components/CurrentTask";
import { NewTask } from "./components/NewTask";
import { TaskRow } from "./components/TaskRow";
import { CombinedTaskRow } from "./components/CombinedTaskRow";
import { useAppSelector } from "./hooks/storeHooks";
import {
  TimeEntry,
  selectTimeEntriesByDate,
  selectCombinedTimeEntries,
  selectCurrentTimeEntry,
} from "./timeEntriesSlice";

function App() {
  const tasksByDate = useAppSelector(selectTimeEntriesByDate);
  const combinedTasks = useAppSelector(selectCombinedTimeEntries);
  const currentTask = useAppSelector(selectCurrentTimeEntry);

  const [isCollapsedMode, setIsCollapsedMode] = useState(false);

  const renderTasks = () => {
    if (isCollapsedMode) {
      return Object.entries(combinedTasks)
        .sort((a, b) => (a[0] > b[0] ? -1 : 1))
        .map(([date, combinedTasksPerDate]: any[]) => {
          return (
            <>
              {date}
              {combinedTasksPerDate.map((combinedTask: any) => (
                <CombinedTaskRow combinedTask={combinedTask} />
              ))}
            </>
          );
        });
    } else {
      return Object.entries(tasksByDate).map(([date, tasksPerDate]: any[]) => {
        return (
          <>
            {date}
            {tasksPerDate.map((task: TimeEntry) => (
              <TaskRow task={task} />
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
          />
        ) : (
          <NewTask />
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
