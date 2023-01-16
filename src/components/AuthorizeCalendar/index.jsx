import React from "react";

import Button from "components/Button";

import { ReactComponent as GcalLogo } from "svg/gcal.svg";
import styles from "./index.module.scss";
function AuthorizeCalendar({ authorized, requestCalendarAccess }) {
  return (
    !authorized && (
      <Button
        className={styles.button}
        onClick={requestCalendarAccess}
        tooltipBottom="Enable Calendar Support"
      >
        <span className={styles.gcal}>
          <GcalLogo className={styles.logo} />
        </span>
      </Button>
    )
  );
}

export default AuthorizeCalendar;
