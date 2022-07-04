import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "tasksPage",
  initialState: {
    selectedTaskId: "",
    searchQuery: "",
    sortBy: "title",
    sortOrder: "asc",
    view: "grid", // grid || table
    tableSort: "status", // status || priority
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
    gridViewSet: (state) => {
      state.view = "grid";
    },
    tableViewSet: (state) => {
      state.view = "table";
    },
    tableSortedByStatus: (state) => {
      state.tableSort = "status";
    },
    tableSortedByPriority: (state) => {
      state.tableSort = "priority";
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
  gridViewSet,
  tableViewSet,
  tableSortedByStatus,
  tableSortedByPriority,
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

export const setGridView = () => (dispatch) => dispatch(gridViewSet());
export const setTableView = () => (dispatch) => dispatch(tableViewSet());

export const sortTableByStatus = () => (dispatch) =>
  dispatch(tableSortedByStatus());
export const sortTableByPriority = () => (dispatch) =>
  dispatch(tableSortedByPriority());

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

export const getView = createSelector(
  (state) => state.ui.tasksPage,
  (tasksPage) => tasksPage.view
);

export const getTableSort = createSelector(
  (state) => state.ui.tasksPage,
  (tasksPage) => tasksPage.tableSort
);
