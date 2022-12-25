import { useEffect } from "react";

const google = window.google;

function useGlobalGoogle() {
  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if (!google) refreshPage();
  });

  return google;
}

export { useGlobalGoogle };
