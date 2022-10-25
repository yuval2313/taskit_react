import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as eventsService from "../../services/gcal/eventsService";

export const fetchTaskItEvents = createAsyncThunk(
  "events/fetchTaskItEvents",
  async (calendarId, { rejectWithValue }) => {
    try {
      const { data } = await eventsService.getTaskItEvents(calendarId);
      return data;
    } catch (ex) {
      const { response } = ex;
      return rejectWithValue({ status: response.status });
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (calendarId, event) => {
    const { data } = await eventsService.postEvent(calendarId, event);
    return data;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (calendarId, eventId) => {
    const { data } = await eventsService.deleteEventById(calendarId, eventId);
    return data;
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (calendarId, event) => {
    const { data } = await eventsService.putEventById(calendarId, event);
    return data;
  }
);

const slice = createSlice({
  name: "events",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskItEvents.fulfilled, (events, action) => {
        events.list = action.payload;
      })

      .addCase(createEvent.fulfilled, (events, action) => {
        const event = action.payload;
        events.push(event);
      })

      .addCase(deleteEvent.fulfilled, (events, action) => {
        const event = action.payload;
        const index = events.list.findIndex((e) => e.id === event.id);
        events.splice(index, 1);
      })

      .addCase(updateEvent.fulfilled, (events, action) => {
        const event = action.payload;
        const index = events.list.findIndex((e) => e.id === event.id);
        events[index] = event;
      });
  },
});

export default slice.reducer;

export const getEventById = (eventId) =>
  createSelector(
    (state) => state.gcal.events,
    (events) => events.list.find((e) => e.id === eventId)
  );
