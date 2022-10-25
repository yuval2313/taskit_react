import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as calendarListService from "../../services/gcal/calendarListService";

export const fetchCalendars = createAsyncThunk(
  "calendarList/fetchCalendars",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await calendarListService.getCalendarList();
      return data;
    } catch (ex) {
      const { response } = ex;
      return rejectWithValue({ status: response.status });
    }
  }
);

const slice = createSlice({
  name: "calendarList",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCalendars.fulfilled, (calendarList, action) => {
      calendarList.list = action.payload;
    });
  },
});

export default slice.reducer;

export const getPrimaryCalendarId = createSelector(
  (state) => state.gcal.calendarList,
  (calendarList) => calendarList.list.find((cal) => cal.primary).id
);
