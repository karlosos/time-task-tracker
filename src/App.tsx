import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useState } from "react";
import { Task, useTasks } from "./hooks/useTasks";
import { CurrentTask } from "./components/CurrentTask";
import { NewTask } from "./components/NewTask";
import { TaskRow } from "./components/TaskRow";
import { CombinedTaskRow } from "./components/CombinedTaskRow";

const dayMonthYearString = (datetime: number) => {
  console.log(">> dayMonthYearString", datetime);
  const dateObj = new Date(datetime);

  return dateObj.toISOString().slice(0, 10);
};

function App() {
  const { tasks, currentTask, addTask, editTask, toggleLogged } = useTasks();
  const [isCollapsedMode, setIsCollapsedMode] = useState(false);

  console.log(">> tasks", tasks);

  const tasksToRender = Object.values(tasks)
    .filter((task) => task.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!);

  const combinedTasks = [...tasksToRender]
    .sort((a: any, b: any) => a.startTime - b.startTime)
    .reduce<any[]>((acc, curr) => {
    const found = acc.find((el) => {
      const sameName = el.text === curr.text;
      const sameDay = el.date === dayMonthYearString(curr.stopTime!);
      return sameName && sameDay;
    });

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
        date: dayMonthYearString(curr.stopTime!),
        logged: [curr.logged],
      });
    }

    return acc;
  }, [])
  .reverse()

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
      const groupedByDate = combinedTasks.reduce<any>((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = []
        }
        acc[curr.date] = [...acc[curr.date], curr];

        return acc
      }, {});

      console.log('>> groupedByDate', groupedByDate)

      return Object.values(groupedByDate).map((dateList: any) => {
        const jsx = <>
            {dateList[0].date}
            {dateList
            .map((combinedTask: any) => (
              <CombinedTaskRow
                combinedTask={combinedTask}
                addNewTask={addTask}
                toggleLogged={toggleLogged}
              />
            ))}
          </>;

        return jsx
      });
    } else {
      return tasksToRender.map((task) => (
        <TaskRow task={task} addNewTask={addTask} editTask={editTask} />
      ));
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
