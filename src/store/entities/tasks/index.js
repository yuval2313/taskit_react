import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as taskService from "../../../services/taskService";

import { selectTask } from "../../ui/tasksPage";

// Async Action Creators
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await taskService.getTasks();
      return data;
    } catch (ex) {
      const { response } = ex;
      return rejectWithValue({ status: response.status });
    }
  }
);

export const saveTask = createAsyncThunk("tasks/saveTask", async (task) => {
  let response;
  if (!task.createdAt) response = await taskService.postTask(task);
  else response = await taskService.putTask(task);

  return { taskId: task._id, task: response.data };
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (task) => {
  const { _id: taskId, createdAt } = task;

  if (createdAt) await taskService.deleteTask(taskId);
  return;
});

const slice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    previousState: [],
    loading: false,
    synced: false,
  },
  reducers: {
    taskAdded: (tasks, action) => {
      const task = action.payload;
      tasks.list.unshift(task);
      tasks.synced = false;
    },
    taskPropertyUpdated: (tasks, action) => {
      const { taskId, name, value } = action.payload;
      const index = tasks.list.findIndex((t) => t._id === taskId);
      tasks.list[index][name] = value;
      tasks.synced = false;
    },
    tasksLabelRemoved: (tasks, action) => {
      const labelId = action.payload;

      tasks.list.forEach((task) => {
        const { labels } = task;

        const index = labels.findIndex((id) => id === labelId);
        if (index >= 0) labels.splice(index, 1);
      });
    },
    tasksSynced: (tasks, action) => {
      tasks.synced = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (tasks) => {
        tasks.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (tasks, action) => {
        tasks.list = action.payload;
        tasks.previousState = action.payload;
        tasks.loading = false;
        tasks.synced = true;
      })
      .addCase(fetchTasks.rejected, (tasks, action) => {
        const { status } = action.payload;
        tasks.loading = false;
        if (status === 404) tasks.synced = true;
      })

      .addCase(deleteTask.pending, (tasks, action) => {
        const task = action.meta.arg;
        const index = tasks.list.findIndex((t) => t._id === task._id);
        tasks.list.splice(index, 1);
        tasks.synced = false;
      })
      .addCase(deleteTask.fulfilled, (tasks) => {
        tasks.previousState = tasks.list;
        tasks.synced = true;
      })
      .addCase(deleteTask.rejected, (tasks, action) => {
        const task = action.meta.arg;
        const index = tasks.list.findIndex((t) => t._id === task._id);
        tasks.list.splice(index, 0, task);
        tasks.synced = true;
      })

      .addCase(saveTask.fulfilled, (tasks, action) => {
        const { task, taskId } = action.payload;
        const index = tasks.list.findIndex((t) => t._id === taskId);

        tasks.list[index] = task;
        tasks.previousState[index] = task;
        tasks.synced = true;
      })
      .addCase(saveTask.rejected, (tasks) => {
        tasks.synced = false;
      });
  },
});

const { taskAdded, taskPropertyUpdated, tasksLabelRemoved, tasksSynced } =
  slice.actions;
export default slice.reducer;

// Action Creators
let newTaskId = 0;
export const addTask = (task) => (dispatch) => {
  const newTask = {
    _id: ++newTaskId,
    title: "",
    content: "",
    status: "",
    priority: "",
    labels: [],
  };

  if (task) {
    for (const property in task) {
      newTask[property] = task[property];
    }
  }

  dispatch(taskAdded(newTask));
  return dispatch(selectTask(newTaskId));
};

export const updateTaskProperty = (taskId, name, value) => (dispatch) =>
  dispatch(taskPropertyUpdated({ taskId, name, value }));

export const removeTasksLabel = (labelId) => (dispatch) =>
  dispatch(tasksLabelRemoved(labelId));

export const setSynced = (setting) => (dispatch) =>
  dispatch(tasksSynced(setting));

// Selectors
export const getTasks = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.list
);

export const getTaskById = (taskId) =>
  createSelector(
    (state) => state.entities.tasks,
    (tasks) => tasks.list.find((t) => t._id === taskId)
  );

export const isLoading = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.loading
);

export const isSynced = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.synced
);
