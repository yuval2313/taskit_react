import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as labelService from "../../../services/labelService";

// Async Action Creators
export const fetchLabels = createAsyncThunk(
  "labels/fetchLabels",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await labelService.getLabels();
      return data;
    } catch (ex) {
      const { response } = ex;
      return rejectWithValue({ status: response.status });
    }
  }
);

export const addLabel = createAsyncThunk("labels/addLabel", async (label) => {
  const { data } = await labelService.postLabel(label);
  return data;
});

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  async ({ label, previousName }) => {
    const { data } = await labelService.putLabel(label);
    return data;
  }
);

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  async (label) => {
    const { _id: labelId, createdAt } = label;

    if (createdAt) await labelService.deleteLabel(labelId);
    return;
  }
);

const slice = createSlice({
  name: "labels",
  initialState: {
    list: [],
    newLabelId: 0,
    loading: false,
    synced: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.pending, (labels) => {
        labels.loading = true;
      })
      .addCase(fetchLabels.fulfilled, (labels, action) => {
        labels.list = action.payload;
        labels.loading = false;
        labels.synced = true;
      })
      .addCase(fetchLabels.rejected, (labels, action) => {
        const { status } = action.payload;
        labels.loading = false;
        if (status === 404) labels.synced = true;
      })

      .addCase(deleteLabel.pending, (labels, action) => {
        const label = action.meta.arg;
        const index = labels.list.findIndex((t) => t._id === label._id);
        labels.list.splice(index, 1);
        labels.synced = false;
      })
      .addCase(deleteLabel.fulfilled, (labels) => {
        labels.synced = true;
      })
      .addCase(deleteLabel.rejected, (labels, action) => {
        const label = action.meta.arg;
        const index = labels.list.findIndex((t) => t._id === label._id);
        labels.list.splice(index, 0, label);
        labels.synced = true;
      })

      .addCase(addLabel.pending, (labels, action) => {
        // const label = action.meta.arg;
        // labels.list.unshift({ _id: labels.newLabelId++, ...label });
        labels.synced = false;
      })
      .addCase(addLabel.fulfilled, (labels, action) => {
        const label = action.payload;
        labels.list.unshift(label);
        labels.synced = true;
      })
      .addCase(addLabel.rejected, (labels) => {
        // labels.list.shift();
        labels.synced = true;
      })

      .addCase(updateLabel.pending, (labels, action) => {
        const { label } = action.meta.arg;
        const index = labels.list.findIndex((l) => l._id === label._id);

        labels.list[index].name = label.name;
        labels.synced = false;
      })
      .addCase(updateLabel.fulfilled, (labels, action) => {
        const label = action.payload;
        const index = labels.list.findIndex((l) => l._id === label._id);

        labels.list[index] = label;
        labels.synced = true;
      })
      .addCase(updateLabel.rejected, (labels, action) => {
        const { label, previousName } = action.meta.arg;
        const index = labels.list.findIndex((l) => l._id === label._id);

        labels.list[index].name = previousName;
        labels.synced = true;
      });
  },
});

export default slice.reducer;

// Selectors
export const getLabels = createSelector(
  (state) => state.entities.labels,
  (labels) => labels.list
);

export const isLoading = createSelector(
  (state) => state.entities.labels,
  (labels) => labels.loading
);

export const isSynced = createSelector(
  (state) => state.entities.labels,
  (labels) => labels.synced
);
