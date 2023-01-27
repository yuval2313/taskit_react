import { logoutUser } from "store/auth";

export const auth =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (/^.+\/.+\/rejected$/.test(action.type)) {
      if (!action.payload || action.payload.status === 401)
        dispatch(logoutUser());
    }
    next(action);
  };
