import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { isLoggedIn } from "store/auth";

import { ReactComponent as Woman } from "svg/woman-typing.svg";
import { useGoogleLogin } from "hooks/useGoogleLogin";

import styles from "./index.module.scss";

function Login() {
  const loggedIn = useSelector(isLoggedIn);
  const buttonRef = useGoogleLogin();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loggedIn) {
      let pathname = "/";

      if (location.state && location.state.from) {
        pathname = location.state.from.pathname;
      }

      navigate(pathname);
    }
  }, [loggedIn]);

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <h1>Task-it</h1>
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.intro}>An Intuitive Task Management App.</h2>
          <p className={styles.slogan}>Prioritize your tasks</p>

          <div className={styles.login}>
            <div ref={buttonRef} />
          </div>
        </div>
        <div className={styles.image}>
          <a
            href="https://iconscout.com/illustration/women-typing-a-content-or-text-for-making-book-2112524"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Woman className={styles.svg} />
          </a>
          <span className={styles.attribution}>
            by{" "}
            <a
              href="https://iconscout.com/contributors/delesign"
              target="_blank"
              rel="noreferrer noopener"
            >
              Delesign Graphics
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
