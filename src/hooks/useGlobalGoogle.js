import { useEffect } from "react";

function useGlobalGoogle(callback) {
  useEffect(() => {
    const googleScript = document.getElementById("global-google-script");

    if (window.google) callback();

    googleScript.addEventListener("load", callback);
  }, []);
}

export { useGlobalGoogle };
