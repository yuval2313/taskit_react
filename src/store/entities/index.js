import { combineReducers } from "redux";
import tasks from "./tasks";
import labels from "./labels";
import reminders from "./reminders";

export default combineReducers({
  tasks,
  labels,
  reminders,
});
