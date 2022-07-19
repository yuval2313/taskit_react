import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import * as labelService from "../../services/labelService";

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

export const createLabel = createAsyncThunk(
  "labels/createLabel",
  async (label) => {
    const { data } = await labelService.postLabel(label);
    return data;
  }
);

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  async ({ label }) => {
    const { data } = await labelService.putLabel(label);
    return data;
  }
);

const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  async ({ label }) => {
    const { data } = await labelService.deleteLabel(label._id);
    return data;
  }
);

const slice = createSlice({
  name: "labels",
  initialState: {
    list: [],
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

      .addCase(deleteLabel.pending, (labels) => {
        labels.synced = false;
      })
      .addCase(deleteLabel.fulfilled, (labels, action) => {
        const { index } = action.meta.arg;
        labels.list.splice(index, 1);
        labels.synced = true;
      })
      .addCase(deleteLabel.rejected, (labels) => {
        labels.synced = true;
      })

      .addCase(createLabel.pending, (labels) => {
        labels.synced = false;
      })
      .addCase(createLabel.fulfilled, (labels, action) => {
        const label = action.payload;
        labels.list.push(label);
        labels.synced = true;
      })
      .addCase(createLabel.rejected, (labels) => {
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

// Action Creators
export const removeLabel = (label) => (dispatch, getState) => {
  const index = getState().entities.labels.list.findIndex(
    (l) => l._id === label._id
  );
  return dispatch(deleteLabel({ label, index }));
};

// Selectors
export const getLabels = createSelector(
  (state) => state.entities.labels,
  (labels) => labels.list.slice().reverse()
);

export const getLabelById = (labelId) =>
  createSelector(
    (state) => state.entities.labels,
    (labels) => labels.list.find((l) => l._id === labelId)
  );

export const getLabelsByIds = (labelIds) =>
  createSelector(
    (state) => state.entities.labels,
    ({ list }) => {
      let labels = [];

      if (list.length) {
        labelIds.forEach((labelId) => {
          const label = list.find((l) => l._id === labelId);
          if (label) labels.push(label);
        });
      }
      return labels;
    }
  );

export const getLabelsExceptIds = (labelIds) =>
  createSelector(
    (state) => state.entities.labels,
    (labels) => labels.list.filter((l) => labelIds.indexOf(l._id) === -1)
  );

export const isLoading = createSelector(
  (state) => state.entities.labels,
  (labels) => labels.loading
);

export const isSynced = createSelector(
  (state) => state.entities.labels,
  (labels) => labels.synced
);
