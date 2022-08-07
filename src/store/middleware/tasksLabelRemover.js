import { removeTasksLabel } from "../entities/tasks";

export const tasksLabelRemover =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === "labels/deleteLabel/fulfilled") {
      const { labelId } = action.meta.arg;
      dispatch(removeTasksLabel(labelId));
    }
    return next(action);
  };
