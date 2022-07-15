import _ from "lodash";
import { setSynced } from "../entities/tasks";

function checkSync({ dispatch, getState }) {
  const { list, previousState } = getState().entities.tasks;
  console.log(list, previousState);
  if (_.isEqual(list, previousState)) dispatch(setSynced());
}

export const tasksSync = (store) => (next) => (action) => {
  if (
    action.type === "tasks/saveTask/fulfilled" ||
    action.type === "tasks/deleteTask/fulfilled" ||
    action.type === "tasks/deleteTask/rejected"
  )
    checkSync(store, action.payload);
  return next(action);
};
