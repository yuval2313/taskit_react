import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import EventForm from "components/EventForm";

import { useClickOutside } from "hooks/useClickOutside";
import { useGoogleAuthentication } from "hooks/useGoogleAuthentication";

import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskAddEvent({ priorityStyle }) {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useClickOutside(handleExit);
  const tokenClient = useGoogleAuthentication(authorizeUser);

  function handleExit() {
    setShowMenu(false);
  }

  function handleToggleMenu() {
    setShowMenu(!showMenu);
  }

  // async function createTestEvent() {
  //   const response = await http.post("/gcal/create-event", {
  //     summary: "summary",
  //     description: "description",
  //     colorId: "5",
  //     start: { dateTime: new Date() },
  //     end: { dateTime: new Date(Date.now() + 3600000) },
  //     extendedProperties: {
  //       private: {
  //         taskIt: true,
  //       },
  //     },
  //   });
  //   console.log(response);
  // }

  async function createEvent(eventBody) {
    // TODO: use Redux to dispatch posting an event
  }

  async function authorizeUser(code) {
    // FIXME: convert to use via Redux
    // return await http.post("/gcal/authorize", {
    //   code,
    // });
  }

  function requestCalendarAccess() {
    tokenClient.requestCode();
  }

  return (
    <div ref={menuRef} className={styles.container}>
      <Button
        icon={faCalendarAlt}
        onClick={handleToggleMenu}
        tooltip="Add to Calendar"
      />
      <DropdownMenu
        in={showMenu}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priorityStyle ? styles[priorityStyle] : styles.prt_unset}
      >
        <EventForm handleExit={handleExit} handleSave={createEvent} />
      </DropdownMenu>
    </div>
  );
}

export default TaskAddEvent;
