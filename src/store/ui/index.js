import { combineReducers } from "redux";
import tasksPage from "./tasksPage";
import labelsSideBar from "./labelsSideBar";

export default combineReducers({
  tasksPage,
  labelsSideBar,
});
