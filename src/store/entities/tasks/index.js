import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as taskService from "../../services/taskService";
import checkSync from "../../helpers/checkSync";

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

const createTask = createAsyncThunk("tasks/createTask", async ({ task }) => {
  const { data } = await taskService.postTask(task);
  return data;
});

const updateTask = createAsyncThunk("tasks/updateTask", async ({ task }) => {
  const { data } = await taskService.putTask(task);
  return data;
});

const deleteTask = createAsyncThunk("tasks/deleteTask", async ({ task }) => {
  const { data } = await taskService.deleteTask(task._id);
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
    newTaskAdded: (tasks, action) => {
      const task = action.payload;
      tasks.list.unshift(task);
      tasks.synced = false;
    },
    newTaskRemoved: (tasks, action) => {
      const { list, cachedList } = tasks;
      const index = action.payload;
      list.splice(index, 1);
      if (checkSync(list, cachedList)) tasks.synced = true;
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
    tasksSynced: (tasks) => {
      tasks.synced = true;
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
        const { list, cachedList } = tasks;
        const { index } = action.meta.arg;

        cachedList.splice(index, 1);
        if (checkSync(list, cachedList)) tasks.synced = true;
      })
      .addCase(deleteTask.rejected, (tasks, action) => {
        const { list, cachedList } = tasks;
        const { task, index } = action.meta.arg;

        list.splice(index, 0, task);
        if (checkSync(list, cachedList)) tasks.synced = true;
      })

      .addCase(createTask.fulfilled, (tasks, action) => {
        const { list, cachedList } = tasks;
        const task = action.payload;
        const { index } = action.meta.arg;

        list[index] = task;
        cachedList.unshift(task);
        if (checkSync(list, cachedList)) tasks.synced = true;
      })
      .addCase(createTask.rejected, (tasks, action) => {
        const { list, cachedList } = tasks;
        const { index } = action.meta.arg;

        list.splice(index, 1);
        if (checkSync(list, cachedList)) tasks.synced = true;
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

const {
  newTaskAdded,
  newTaskRemoved,
  taskPropertyUpdated,
  tasksLabelRemoved,
  tasksSynced,
} = slice.actions;
export default slice.reducer;

// Action Creators
let newTaskId = 0;
export const addNewTask = (task) => (dispatch) => {
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

  dispatch(newTaskAdded(newTask));
  return newTaskId;
};

export const saveTask = (task) => (dispatch, getState) => {
  const { list, cachedList } = getState().entities.tasks;
  const index = list.findIndex((t) => t._id === task._id);

  if (checkSync(list, cachedList)) return dispatch(tasksSynced());

  return !task.createdAt
    ? dispatch(createTask({ task, index }))
    : dispatch(updateTask({ task, index }));
};

export const removeTask = (task) => (dispatch, getState) => {
  const index = getState().entities.tasks.list.findIndex(
    (t) => t._id === task._id
  );
  if (!task.createdAt) return dispatch(newTaskRemoved(index));
  else return dispatch(deleteTask({ task, index }));
};

export const updateTaskProperty = (taskId, name, value) => (dispatch) =>
  dispatch(taskPropertyUpdated({ taskId, name, value }));

export const removeTasksLabel = (labelId) => (dispatch) =>
  dispatch(tasksLabelRemoved(labelId));

// Selectors
export const getTasks = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.list
);

export const isLoading = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.loading
);

export const isSynced = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.synced
);
