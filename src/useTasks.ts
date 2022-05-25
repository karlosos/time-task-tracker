import { useState } from "react";
import { generateId } from "./utils";

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
  const [tasks, setTasks] = useState<TasksList>({
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
  });

  const currentTask = Object.values(tasks).find(
    (task) => !task.stopTime 
  );

  const addTask = (text: string, startTime: number) => {
    const id = generateId();

    // Update currentTask with stopTime
    let previousTasks;
    if (currentTask) {
      previousTasks = {
        ...tasks,
        [currentTask.id]: {
          ...currentTask,
          stopTime: Date.now()
        }
      }
    } else {
      previousTasks = {
        ...tasks,
      }
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
    console.log('>> editTask', task.id)
    setTasks({
      ...tasks,
      [task.id]: {
        ...task,
      },
    });
  };

  const toggleLogged = (taskIds: string[]) => {
    // TODO: not working as expected
    taskIds.forEach(id => {
    console.log('>> toggleLogged', id)
      const task = {
        ...tasks[id],
        logged: !tasks[id].logged,
      };
      editTask(task);
    });
  }

  return {
    tasks,
    currentTask,
    addTask,
    editTask,
    toggleLogged,
  };
};
