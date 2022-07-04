import _ from "lodash";
import { saveTask, setSynced } from "../entities/tasks";

let saveTimer;
let debounceTime = 5000;

const saveDebounce = ({ dispatch, getState }, taskId) => {
  if (saveTimer) {
    clearTimeout(saveTimer);
  }

  saveTimer = setTimeout(() => {
    const { list, previousState } = getState().entities.tasks;
    const index = list.findIndex((t) => t._id === taskId);

    const task = list[index];
    const cachedTask = previousState[index];

    if (_.isEqual(task, cachedTask)) dispatch(setSynced(true));
    else {
      if (task.createdAt) dispatch(saveTask(task));
    }
  }, debounceTime);
};

export const taskSaver = (store) => (next) => (action) => {
  if (action.type === "tasks/taskPropertyUpdated")
    saveDebounce(store, action.payload.taskId);
  return next(action);
};
