import { unauthorizeUser } from "store/auth";
import { clearEvents } from "store/entities/gcal";

export const calendarAuthorization =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (/^gcal\/.+\/rejected$/.test(action.type)) {
      const { status } = action.payload;
      if (status === 403) {
        dispatch(unauthorizeUser());
        dispatch(clearEvents());
      }
    }
    next(action);
  };
