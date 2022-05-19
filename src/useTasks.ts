import { useState } from "react";
import { generateId } from "./utils";

export interface Task {
  id: string;
  text: string;
  startTime: number;
  stopTime?: number;
}

export type TasksList = {
  [id: string]: Task;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksList>({
    "1": {
      id: "1",
      text: "DX1-3213: Doing something",
      startTime: 1653236911845,
      stopTime: undefined,
    },
    "2": {
      id: "2",
      text: "DX1-1111: Different task",
      startTime: 1653236911845,
      stopTime: 1653237028845,
    },
  });

  const currentTask = Object.values(tasks).find(
    (task) => !task.stopTime 
  );

  const addTask = (text: string, startTime: number) => {
    const id = generateId();
    setTasks({
      ...tasks,
      [id]: {
        id: id,
        text: text,
        startTime: startTime,
        stopTime: undefined,
      },
    });
  };

  const editTask = (task: Task) => {
    setTasks({
      ...tasks,
      [task.id]: {
        ...task,
      },
    });
  };

  return {
    tasks,
    currentTask,
    addTask,
    editTask,
  };
};
