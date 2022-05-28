import { useState } from "react";
import { formatDayMonthYear, generateId } from "../utils";

export interface Task {
  id: string;
  text: string;
  startTime: number;
  stopTime?: number;
  logged: boolean;
}

export type TasksList = {
  [id: string]: Task;
};

export const useTasks = () => {
  const [_tasks, setTasks] = useState<TasksList>({
    "1": {
      id: "1",
      text: "DX1-3213: Doing something",
      startTime: 1653236911845,
      stopTime: undefined,
      logged: false,
    },
    "2": {
      id: "2",
      text: "DX1-1111: Different task",
      startTime: 1653236911845,
      stopTime: 1653237028845,
      logged: false,
    },
    "3": {
      id: "3",
      text: "DX1-1111: Different task",
      startTime: 1653672520415,
      stopTime: 1653672530415,
      logged: false,
    },
  });

  const tasks = Object.values(_tasks)
    .filter((task) => task.stopTime)
    .sort((a, b) => b.stopTime! - a.stopTime!)

  const tasksByDate = [...tasks].reduce(groupTasksByDate, {});

  const currentTask = Object.values(_tasks).find((task) => !task.stopTime);

  const combinedTasks = [...tasks]
    .sort((a: any, b: any) => a.startTime - b.startTime)
    .reduce(groupTasksByName, [])
    .reverse()
    .reduce(groupCombinedTasksByDate, {})

  const addTask = (text: string, startTime: number) => {
    const id = generateId();

    let previousTasks;
    if (currentTask) {
      previousTasks = {
        ..._tasks,
        [currentTask.id]: {
          ...currentTask,
          stopTime: Date.now(),
        },
      };
    } else {
      previousTasks = {
        ..._tasks,
      };
    }

    setTasks({
      ...previousTasks,
      [id]: {
        id: id,
        text: text,
        startTime: startTime,
        stopTime: undefined,
        logged: false,
      },
    });
  };

  const editTask = (task: Task) => {
    setTasks({
      ..._tasks,
      [task.id]: {
        ...task,
      },
    });
  };

  const toggleLogged = (taskIds: string[]) => {
    const newTasks: TasksList = {};
    Object.values(_tasks).forEach((task) => {
      if (taskIds.includes(task.id)) {
        task.logged = !task.logged;
      }
      newTasks[task.id] = task;
    });

    setTasks(newTasks);
  };

  return {
    tasks,
    tasksByDate,
    combinedTasks,
    currentTask,
    addTask,
    editTask,
    toggleLogged,
  };
};

const groupTasksByName = (grouped: any[], current: Task) => {
  const found = grouped.find((el) => {
    const sameName = el.text === current.text;
    const sameDay = el.date === formatDayMonthYear(current.stopTime!);
    return sameName && sameDay;
  });

  const diff = current.stopTime! - current.startTime;
  if (found) {
    found.elapsedTime = found.elapsedTime + diff;
    found.ids.push(current.id);
    found.logged.push(current.logged);
  } else {
    grouped.push({
      text: current.text,
      ids: [current.id],
      elapsedTime: diff,
      date: formatDayMonthYear(current.stopTime!),
      logged: [current.logged],
    });
  }

  return grouped;
};

const groupCombinedTasksByDate = (grouped: any, current: any) => {
  if (!grouped[current.date]) {
    grouped[current.date] = [];
  }
  grouped[current.date] = [...grouped[current.date], current];

  return grouped;
};


const groupTasksByDate = (grouped: any, current: any) => {
  const currentDate = formatDayMonthYear(current.stopTime!);

  if (!grouped[currentDate]) {
    grouped[currentDate] = [];
  }
  grouped[currentDate] = [...grouped[currentDate], current];

  return grouped;
};
