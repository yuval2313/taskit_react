import { useEffect } from "react";
import { logoutUser } from "./../services/authService";

function Logout() {
  useEffect(() => {
    logoutUser();
    window.location = "/";
  }, []);

  return null;
}

export default Logout;
