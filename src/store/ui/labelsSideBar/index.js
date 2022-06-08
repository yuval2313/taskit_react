import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "labelsSideBar",
  initialState: {
    searchQuery: "",
    selectedLabelId: "",
  },
  reducers: {
    labelSelected: (state, action) => {
      state.selectedLabelId = action.payload;
    },
    labelDeselected: (state) => {
      state.selectedLabelId = "";
    },
    labelsQueried: (state, action) => {
      state.searchQuery = action.payload;
    },
    queryCleared: (state) => {
      state.searchQuery = "";
    },
  },
});

const { labelSelected, labelDeselected, labelsQueried, queryCleared } =
  slice.actions;
export default slice.reducer;

// Action Creators

export const selectLabel = (labelId) => (dispatch) =>
  dispatch(labelSelected(labelId));

export const deselectLabel = () => (dispatch) => dispatch(labelDeselected());

export const queryLabels = (query) => (dispatch) =>
  dispatch(labelsQueried(query));

export const clearQuery = () => (dispatch) => dispatch(queryCleared());

// Selectors

export const getSelectedLabelId = createSelector(
  (state) => state.ui.labelsSideBar,
  (labelsSideBar) => labelsSideBar.selectedLabelId
);

export const getSearchQuery = createSelector(
  (state) => state.ui.labelsSideBar,
  (labelsSideBar) => labelsSideBar.searchQuery
);
