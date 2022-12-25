import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import EventForm from "components/EventForm";
import AuthorizeCalendar from "components/AuthorizeCalendar";

import { useSelector, useDispatch } from "react-redux";
import { createEvent, deleteEvent, updateEvent } from "store/entities/gcal";
import { isAuthorized, authorizeUser } from "store/auth";

import { useClickOutside } from "hooks/useClickOutside";
import { useGoogleAuthentication } from "hooks/useGoogleAuthentication";

import {
  faCalendarPlus,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskEvent({ priorityStyle, mapToEvent, event }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useClickOutside(handleExit);

  const authorized = useSelector(isAuthorized);
  const dispatch = useDispatch();
  const tokenClient = useGoogleAuthentication(async (code) => {
    await dispatch(authorizeUser(code)).unwrap();
    setShowMenu(true);
  });

  function handleExit() {
    setShowMenu(false);
  }

  function handleToggleMenu() {
    setShowMenu(!showMenu);
  }

  async function handleCreateEvent({ start, end, reminders }) {
    const eventBody = await mapToEvent(start, end, reminders);
    return dispatch(createEvent(eventBody));
  }

  function handleDeleteEvent(eventId) {
    return dispatch(deleteEvent(eventId));
  }

  async function handleUpdateEvent({ start, end, reminders }) {
    const eventBody = await mapToEvent(start, end, reminders);
    eventBody.id = event.id;
    return dispatch(updateEvent(eventBody));
  }

  function requestCalendarAccess() {
    return tokenClient.requestCode();
  }

  return (
    <div ref={menuRef} className={styles.container}>
      {authorized ? (
        <Button
          icon={event ? faCalendarCheck : faCalendarPlus}
          onClick={handleToggleMenu}
          tooltip={event ? "Edit Event" : "Add to Calendar"}
        />
      ) : (
        <AuthorizeCalendar
          authorized={authorized}
          requestCalendarAccess={requestCalendarAccess}
        />
      )}
      <DropdownMenu
        in={showMenu}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priorityStyle ? styles[priorityStyle] : styles.prt_unset}
      >
        <EventForm
          event={event}
          onSave={handleCreateEvent}
          onDelete={handleDeleteEvent}
          onEdit={handleUpdateEvent}
          onExit={handleExit}
        />
      </DropdownMenu>
    </div>
  );
}

export default TaskEvent;
