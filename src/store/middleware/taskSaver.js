import _ from "lodash";
import { saveTask, setSynced } from "../entities/tasks";
// import * as labels from "../entities/labels";

let saveTimer;
let debounceTime = 5000;

// const saveDebounce = ({ dispatch, getState }, entityId, sliceName) => {
//   if (saveTimer) {
//     clearTimeout(saveTimer);
//   }

//   let setSynced, saveEntity;
//   if (sliceName === "tasks") {
//     setSynced = tasks.setSynced;
//     saveEntity = tasks.saveTask;
//   }
//   if (sliceName === "labels") {
//     setSynced = labels.setSynced;
//     saveEntity = labels.saveLabel;
//   }

//   saveTimer = setTimeout(() => {
//     const { list, previousState } = getState().entities[sliceName];
//     const index = list.findIndex((ent) => ent._id === entityId);

//     const entity = list[index];
//     const cachedEntity = previousState[index];

//     if (_.isEqual(entity, cachedEntity)) dispatch(setSynced(true));
//     else {
//       if (entity.createdAt) dispatch(saveEntity(entity));
//     }
//   }, debounceTime);
// };

// export const entitySaver = (store) => (next) => (action) => {
//   if (action.type === "tasks/taskPropertyUpdated")
//     saveDebounce(store, action.payload.taskId, "tasks");
//   if (action.type === "labels/labelPropertyUpdated")
//     saveDebounce(store, action.payload.labelId, "labels");
//   return next(action);
// };

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
