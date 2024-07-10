import { Todo } from "../interface/task";
import { Tasklist } from "../interface/tasklist";

export const taskLists: Tasklist = [
  {
    userId: 1,
    id: 1,
    taskName: "Complete assignment",
    isCompleted: false,
    createdAt: new Date("2000-12-12"),
  },
  {
    userId: 1,
    id: 2,
    taskName: "Wash the dishes",
    isCompleted: false,
    createdAt: new Date("2000-10-12"),
  },
  {
    userId: 2,
    id: 3,
    taskName: "learn about containers and docker",
    isCompleted: false,
    createdAt: new Date("2001-12-12"),
  },
  {
    userId: 1,
    id: 4,
    taskName: "call mom",
    isCompleted: false,
    createdAt: new Date("2000-02-12"),
  },
];

export const addTask = (newTask: Todo) => {
  const task = {
    userId: newTask.userId,
    id: taskLists.length + 1,
    taskName: newTask.taskName,
    createdAt: new Date(),
    isCompleted: false,
    deletedAt: null,
  };
  taskLists.push(task);
};

export const findTasksByUserId = (userId: number) => {
  console.log("userId inside model", userId);
  return taskLists.filter((task) => {
    return task.userId === userId;
  });
};

export const getTasks = () => {
  return taskLists;
};

export const findTaskIndexById = (id: number): number => {
  return taskLists.findIndex((task) => task.id === id);
};

export const updateTask = (id: number, updatedData: Todo, index: number) => {
  taskLists[index] = { ...taskLists[index], ...updatedData };
  return taskLists[index];
};

export const deleteTask = (index: number): void => {
  taskLists.splice(index, 1);
};
