import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as tasksService from "../../services/tasksService";
import checkSync from "../../helpers/checkSync";

// Async Action Creators
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await tasksService.getTasks();
      return data;
    } catch (ex) {
      const { response } = ex;
      return rejectWithValue({ status: response.status });
    }
  }
);

const createTask = createAsyncThunk("tasks/createTask", async (task) => {
  const { data } = await tasksService.postTask(task);
  return data;
});

const updateTask = createAsyncThunk("tasks/updateTask", async ({ task }) => {
  const { data } = await tasksService.putTask(task);
  return data;
});

const deleteTask = createAsyncThunk("tasks/deleteTask", async ({ taskId }) => {
  const { data } = await tasksService.deleteTask(taskId);
  return data;
});

const slice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    cachedList: [],
    loading: false,
    synced: false,
  },
  reducers: {
    tasksLabelRemoved: (tasks, action) => {
      const labelId = action.payload;

      tasks.list.forEach((task) => {
        const { labels } = task;

        const index = labels.findIndex((id) => id === labelId);
        if (index >= 0) labels.splice(index, 1);
      });
    },
    tasksSynced: (tasks) => {
      tasks.synced = true;
    },
    tasksUnsynced: (tasks) => {
      tasks.synced = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (tasks) => {
        tasks.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (tasks, action) => {
        tasks.list = action.payload;
        tasks.cachedList = action.payload;
        tasks.loading = false;
        tasks.synced = true;
      })
      .addCase(fetchTasks.rejected, (tasks, action) => {
        const { status } = action.payload;
        tasks.loading = false;
        if (status === 404) tasks.synced = true;
      })

      .addCase(deleteTask.pending, (tasks, action) => {
        const { index } = action.meta.arg;
        tasks.list.splice(index, 1);
        tasks.synced = false;
      })
      .addCase(deleteTask.fulfilled, (tasks, action) => {
        const { index } = action.meta.arg;
        const { list, cachedList } = tasks;

        cachedList.splice(index, 1);
        if (checkSync(list, cachedList)) tasks.synced = true;
      })
      .addCase(deleteTask.rejected, (tasks, action) => {
        const { index } = action.meta.arg;
        const { list, cachedList } = tasks;
        const cachedTask = cachedList[index];

        list.splice(index, 0, cachedTask);
        if (checkSync(list, cachedList)) tasks.synced = true;
      })

      .addCase(createTask.pending, (tasks, action) => {
        const { list } = tasks;
        const task = action.meta.arg;

        list.unshift(task);
        tasks.synced = false;
      })
      .addCase(createTask.fulfilled, (tasks, action) => {
        const { list, cachedList } = tasks;
        const task = action.payload;

        list[0] = task;
        cachedList.unshift(task);
        if (checkSync(list, cachedList)) tasks.synced = true;
      })
      .addCase(createTask.rejected, (tasks) => {
        const { list, cachedList } = tasks;

        list.shift();
        if (checkSync(list, cachedList)) tasks.synced = true;
      })

      .addCase(updateTask.pending, (tasks, action) => {
        const { list } = tasks;
        const { task, index } = action.meta.arg;

        list[index] = { ...list[index], ...task };

        tasks.synced = false;
      })
      .addCase(updateTask.fulfilled, (tasks, action) => {
        const { list, cachedList } = tasks;
        const task = action.payload;
        const { index } = action.meta.arg;

        list[index] = task;
        cachedList[index] = task;
        if (checkSync(list, cachedList)) tasks.synced = true;
      })
      .addCase(updateTask.rejected, (tasks, action) => {
        const { list, cachedList } = tasks;
        const { index } = action.meta.arg;

        list[index] = cachedList[index];
        if (checkSync(list, cachedList)) tasks.synced = true;
      });
  },
});

const { tasksLabelRemoved, tasksSynced, tasksUnsynced } = slice.actions;
export default slice.reducer;

// Action Creators

export const saveTask = (task) => (dispatch, getState) => {
  const index = getState().entities.tasks.list.findIndex(
    (t) => t._id === task._id
  );

  return index === -1
    ? dispatch(createTask(task))
    : dispatch(updateTask({ task, index }));
};

export const removeTask = (taskId) => (dispatch, getState) => {
  const index = getState().entities.tasks.list.findIndex(
    (t) => t._id === taskId
  );

  return dispatch(deleteTask({ taskId, index }));
};

export const removeTasksLabel = (labelId) => (dispatch) =>
  dispatch(tasksLabelRemoved(labelId));

export const setTasksSynced = (setting) => (dispatch, getState) => {
  const { list, cachedList, synced } = getState().entities.tasks;

  if (setting === true && !synced && checkSync(list, cachedList))
    dispatch(tasksSynced());
  else if (setting === false && synced) dispatch(tasksUnsynced());
};
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
