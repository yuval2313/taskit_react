import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "formErrors",
  initialState: {},
  reducers: {
    errorSet: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    errorCleared: (state, action) => {
      const errorName = action.payload;
      delete state[errorName];
    },
    errorsCleared: (state) => {
      state = {};
    },
  },
});

const { errorSet, errorCleared, errorsCleared } = slice.actions;
export default slice.reducer;

// Action Creators
export const setError = (error) => (dispatch) => dispatch(errorSet(error));
export const clearError = (errorName) => (dispatch) =>
  dispatch(errorCleared(errorName));
export const clearErrors = () => (dispatch) => dispatch(errorsCleared());

// Selectors
export const getErrors = (state) => state.ui.formErrors;
