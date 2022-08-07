import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "ui",
  initialState: {
    selectedLabelId: "",
  },
  reducers: {
    labelSelected: (state, action) => {
      state.selectedLabelId = action.payload;
    },
    labelDeselected: (state) => {
      state.selectedLabelId = "";
    },
  },
});

const { labelSelected, labelDeselected } = slice.actions;
export default slice.reducer;

// Action Creators
export const selectLabel = (labelId) => (dispatch) =>
  dispatch(labelSelected(labelId));

export const deselectLabel = () => (dispatch) => dispatch(labelDeselected());

// Selectors
export const getSelectedLabelId = createSelector(
  (state) => state.ui,
  (ui) => ui.selectedLabelId
);
