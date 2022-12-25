import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchUser } from "store/auth";

function usePopulateUser() {
  const dispatch = useDispatch();

  function populateUser() {
    dispatch(fetchUser());
  }

  useEffect(populateUser, []);
}

export { usePopulateUser };
