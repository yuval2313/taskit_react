import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { isLoggedIn } from "store/auth";

import { useGoogleLogin } from "hooks/useGoogleLogin";

import styles from "./index.module.scss";

function Login() {
  const loggedIn = useSelector(isLoggedIn);
  const buttonRef = useGoogleLogin();

  useEffect(() => {
    if (loggedIn) window.location = "/";
  }, [loggedIn]);

  return (
    <div className={styles.container}>
      <div ref={buttonRef} style={{ display: loggedIn ? "none" : "initial" }} />
    </div>
  );
}

export default Login;
