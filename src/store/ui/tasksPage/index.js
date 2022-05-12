import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "tasksPage",
  initialState: {
    selectedTaskId: "",
    searchQuery: "",
    sortBy: "title",
    sortOrder: "asc",
  },
  reducers: {
    taskSelected: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    taskDeselected: (state) => {
      state.selectedTaskId = "";
    },
    tasksQueried: (state, action) => {
      state.searchQuery = action.payload;
    },
    queryCleared: (state) => {
      state.searchQuery = "";
    },
    tasksSortedBy: (state, action) => {
      state.sortBy = action.payload;
    },
    tasksSortOrderChanged: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

const {
  taskSelected,
  taskDeselected,
  tasksQueried,
  queryCleared,
  tasksSortedBy,
  tasksSortOrderChanged,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const selectTask = (taskId) => (dispatch) =>
  dispatch(taskSelected(taskId));

export const deselectTask = () => (dispatch) => dispatch(taskDeselected());

export const queryTasks = (query) => (dispatch) =>
  dispatch(tasksQueried(query));

export const clearQuery = () => (dispatch) => dispatch(queryCleared());

export const sortTasksBy = (propertyName) => (dispatch) =>
  dispatch(tasksSortedBy(propertyName));

export const changeSortOrder = () => (dispatch, getState) => {
  const { sortOrder } = getState().ui.tasksPage;
  let newSortOrder = "";

  if (sortOrder === "asc") newSortOrder = "desc";
  else newSortOrder = "asc";

  dispatch(tasksSortOrderChanged(newSortOrder));
};

// Selectors

export const getSelectedTaskId = createSelector(
  (state) => state.ui.tasksPage,
  (tasksPage) => tasksPage.selectedTaskId
);

export const getSearchQuery = createSelector(
  (state) => state.ui.tasksPage,
  (tasksPage) => tasksPage.searchQuery
);

export const getSortBy = createSelector(
  (state) => state.ui.tasksPage,
  (tasksPage) => tasksPage.sortBy
);

export const getSortOrder = createSelector(
  (state) => state.ui.tasksPage,
  (tasksPage) => tasksPage.sortOrder
);
