import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as gcalService from "store/services/gcalService";
import withRejectWrapper from "store/helpers/withRejectWrapper";

export const fetchEvents = createAsyncThunk(
  "gcal/fetchEvents",
  withRejectWrapper(async () => {
    const { data } = await gcalService.getTaskItEvents();
    return data;
  })
);

export const createEvent = createAsyncThunk(
  "gcal/createEvent",
  withRejectWrapper(async (event) => {
    const { data } = await gcalService.createEvent(event);
    return data;
  })
);

export const deleteEvent = createAsyncThunk(
  "gcal/deleteEvent",
  withRejectWrapper(async (eventId) => {
    const { data } = await gcalService.deleteEvent(eventId);
    return data;
  })
);

export const updateEvent = createAsyncThunk(
  "gcal/updateEvent",
  withRejectWrapper(async (event) => {
    const { data } = await gcalService.updateEvent(event);
    return data;
  })
);

const slice = createSlice({
  name: "gcal",
  initialState: {
    list: [],
  },
  reducers: {
    eventsCleared: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        const { items } = action.payload;
        state.list = items;
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        const event = action.payload;
        state.list.push(event);
      })

      .addCase(deleteEvent.fulfilled, (state, action) => {
        const eventId = action.meta.arg;
        const index = state.list.findIndex((event) => event.id === eventId);
        state.list.splice(index, 1);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        const { status } = action.payload;
        if (status === 410) {
          const eventId = action.meta.arg;
          const index = state.list.findIndex((event) => event.id === eventId);
          state.list.splice(index, 1);
        }
      })

      .addCase(updateEvent.fulfilled, (state, action) => {
        const event = action.payload;
        const { id: eventId } = event;
        const index = state.list.findIndex((event) => event.id === eventId);
        state.list[index] = event;
      });
  },
});

const { eventsCleared } = slice.actions;
export default slice.reducer;

// Action Creators

export const clearEvents = () => (dispatch) => dispatch(eventsCleared());

// Selectors

export const getEventByTaskId = (taskId) =>
  createSelector(
    (state) => state.entities.gcal,
    (gcal) =>
      gcal.list.find(
        (event) => event.extendedProperties.private.taskId === taskId
      )
  );
