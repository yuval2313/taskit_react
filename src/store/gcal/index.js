import { combineReducers } from "redux";

import calendarList from "./calendarList";
import events from "./events";

export default combineReducers({
  calendarList,
  events,
});
