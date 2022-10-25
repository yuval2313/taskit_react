import { combineReducers } from "redux";
import entities from "./entities";
import ui from "./ui";
import auth from "./auth";
import gcal from "./gcal";

export default combineReducers({
  entities,
  ui,
  auth,
  gcal,
});
