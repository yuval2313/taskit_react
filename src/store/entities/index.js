import { combineReducers } from "redux";
import tasks from "./tasks";
import labels from "./labels";

export default combineReducers({
  tasks,
  labels,
});
