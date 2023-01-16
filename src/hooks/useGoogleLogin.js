import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "store/auth";

function useGoogleLogin() {
  const dispatch = useDispatch();

  function handleGoogleLogin(res) {
    dispatch(loginUser(res.credential));
  }

  const buttonRef = useRef();
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(buttonRef.current, {
      theme: "filled_blue",
    });
  }, []);

  return buttonRef;
}

export { useGoogleLogin };
