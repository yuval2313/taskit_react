import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEvents } from "store/entities/gcal";
import { isAuthorized } from "store/auth";

function usePopulateEvents() {
  const dispatch = useDispatch();
  const authorized = useSelector(isAuthorized);

  function populateEvents() {
    if (authorized) dispatch(fetchEvents());
  }

  useEffect(populateEvents, [authorized]);
}

export { usePopulateEvents };
