import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchLabels,
  getLabels,
  isLoading,
} from "../../../../store/entities/labels";

import Loading from "../../../common/Loading";
import LabelsHead from "../LabelsHead";
import LabelsMain from "../LabelsMain";

import styles from "./index.module.scss";

function Labels() {
  const dispatch = useDispatch();
  const labels = useSelector(getLabels);
  const loading = useSelector(isLoading);

  useEffect(() => {
    populateLabels();
  }, []);

  async function populateLabels() {
    try {
      await dispatch(fetchLabels()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === (400 || 401)) {
        window.location = "/logout";
      }
    }
  }

  return loading ? (
    <Loading className={styles.loading} />
  ) : (
    <React.Fragment>
      <LabelsHead />
      <LabelsMain labels={labels} />
    </React.Fragment>
  );
}

export default Labels;
