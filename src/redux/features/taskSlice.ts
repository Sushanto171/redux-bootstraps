import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { deleteUser } from "./userSlice";

export type IFilter = "All" | "Medium" | "Low" | "High";
interface InitialState {
  tasks: ITask[];
  filter: IFilter;
}

const initialState: InitialState = {
  tasks: [
    {
      id: "UQ9-Lgf68pOnO84kdssXx6Ra",
      isCompleted: false,
      title: "Learn Redux",
      description: "Learning Redux",
      dueDate: "7/22/2025",
      priority: "Low",
      assignedTo: "wrtlkwetrkedwtlwre",
    },
  ],
  filter: "All",
};

type DraftTask = Pick<
  ITask,
  "description" | "dueDate" | "title" | "priority" | "assignedTo"
>;

const createTask = (data: DraftTask): ITask => {
  return {
    ...data,
    id: nanoid(),
    isCompleted: false,
    assignedTo: data.assignedTo ?? null,
  };
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.tasks.push(task);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title ?? task.title,
              description: action.payload.description ?? task.description,
              dueDate: action.payload.dueDate ?? task.dueDate,
              priority: action.payload.priority ?? task.priority,
            }
          : task
      );
    },
    filterState: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser, (state, action) => {
      state.tasks.forEach((task) =>
        task.assignedTo === action.payload ? (task.assignedTo = null) : task
      );
    });
  },
});

export const taskSelector = (state: RootState) => {
  const filter = state.todo.filter;
  if (filter === "High") {
    return state.todo.tasks.filter((task) => task.priority === "High");
  } else if (filter === "Medium") {
    return state.todo.tasks.filter((task) => task.priority === "Medium");
  } else if (filter === "Low") {
    return state.todo.tasks.filter((task) => task.priority === "Low");
  }
  return state.todo.tasks;
};

export const filterSelector = (state: RootState) => {
  return state.todo.filter;
};
export const {
  addTask,
  toggleCompleteState,
  deleteTask,
  updateTask,
  filterState,
} = taskSlice.actions;
export default taskSlice.reducer;
