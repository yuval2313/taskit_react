import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { tasksLabelRemover } from "./middleware/tasksLabelRemover";
import { calendarAuthorization } from "./middleware/calendarAuthorization";
import { auth } from "./middleware/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        auth,
        calendarAuthorization,
        tasksLabelRemover
      ),
  });
}
