import { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useGlobalGoogle } from "hooks/useGlobalGoogle";

import { loginUser } from "store/auth";

function useGoogleLogin() {
  const dispatch = useDispatch();
  const google = useGlobalGoogle();

  function handleGoogleLogin(res) {
    dispatch(loginUser(res.credential));
  }

  const buttonRef = useRef();
  useEffect(() => {
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [google]);

  return buttonRef;
}

export { useGoogleLogin };
