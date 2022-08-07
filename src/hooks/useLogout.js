import { useDispatch } from "react-redux";
import { logoutUser } from "store/auth";

function useLogout() {
  const dispatch = useDispatch();

  return () => {
    dispatch(logoutUser());
    window.location = "/";
  };
}

export { useLogout };
