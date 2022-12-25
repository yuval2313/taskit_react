import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchLabels } from "store/entities/labels";

function usePopulateLabels() {
  const dispatch = useDispatch();

  function populateLabels() {
    dispatch(fetchLabels());
  }

  useEffect(populateLabels, []);
}

export { usePopulateLabels };
