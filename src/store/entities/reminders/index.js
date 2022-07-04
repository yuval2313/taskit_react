import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as reminderService from "../../../services/reminderService";

// Async Action Creators
export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await reminderService.getReminders();
      return data;
    } catch (ex) {
      const { response } = ex;
      return rejectWithValue({ status: response.status });
    }
  }
);

export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async (reminder) => {
    const { data } = await reminderService.postReminder(reminder);
    return data;
  }
);

// export const updateReminder = createAsyncThunk(
//   "reminders/updateReminder",
//   async (reminder) => {}
// );

export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async ({ reminder }) => {
    const { data } = await reminderService.deleteReminder(reminder._id);
    return data;
  }
);

const slice = createSlice({
  name: "reminders",
  initialState: {
    list: [],
    loading: false,
    synced: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.pending, (reminders) => {
        reminders.loading = true;
      })
      .addCase(fetchReminders.fulfilled, (reminders, action) => {
        reminders.list = action.payload;
        reminders.loading = false;
        reminders.synced = true;
      })
      .addCase(fetchReminders.rejected, (reminders, action) => {
        const { status } = action.payload;
        reminders.loading = false;
        if (status === 404) reminders.synced = true;
      })

      .addCase(deleteReminder.pending, (reminders) => {
        reminders.synced = false;
      })
      .addCase(deleteReminder.fulfilled, (reminders, action) => {
        const { index } = action.meta.arg;
        reminders.list.splice(1, index);
        reminders.synced = true;
      })
      .addCase(deleteReminder.rejected, (reminders) => {
        reminders.synced = true;
      })

      .addCase(addReminder.pending, (reminders) => {
        reminders.synced = false;
      })
      .addCase(addReminder.fulfilled, (reminders, action) => {
        const reminder = action.payload;
        reminders.list.push(reminder);
        reminders.synced = true;
      })
      .addCase(addReminder.rejected, (reminders) => {
        reminders.synced = true;
      });
  },
});

export default slice.reducer;

// Action Creators
export const removeReminder = (reminder) => (dispatch, getState) => {
  const index = getState().entities.reminders.list.findIndex(
    (r) => r._id === reminder._id
  );
  return dispatch(deleteReminder({ reminder, index }));
};

// Selectors

export const getReminders = createSelector(
  (state) => state.entities.reminders,
  (reminders) => reminders.list
);

export const getTaskReminder = (taskId) =>
  createSelector(
    (state) => state.entities.reminders,
    (reminders) => reminders.list.find((r) => r.taskId === taskId)
  );

export const isLoading = createSelector(
  (state) => state.entities.reminders,
  (reminders) => reminders.loading
);

export const isSynced = createSelector(
  (state) => state.entities.reminders,
  (reminders) => reminders.synced
);
