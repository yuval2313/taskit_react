import { combineReducers } from "redux";
import tasks from "./tasks";
import labels from "./labels";
import gcal from "./gcal";

export default combineReducers({
  tasks,
  labels,
  gcal,
});
