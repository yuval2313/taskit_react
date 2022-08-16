import { useDispatch } from "react-redux";
import { logoutUser } from "store/auth";

function useLogout() {
  const dispatch = useDispatch();

  return () => {
    dispatch(logoutUser());
  };
}

export { useLogout };
