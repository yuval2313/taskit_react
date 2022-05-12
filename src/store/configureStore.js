import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import { taskSaver } from "./middleware/taskSaver";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(taskSaver),
  });
}
