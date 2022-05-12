import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/auth";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
    window.location = "/";
  }, [dispatch]);

  return null;
}

export default Logout;
