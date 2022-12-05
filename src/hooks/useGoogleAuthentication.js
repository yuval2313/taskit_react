import { useEffect, useState } from "react";

function useGoogleAuthentication(callback) {
  const [tokenClient, setTokenClient] = useState({});

  useEffect(() => {
    /* global google */
    setTokenClient(
      google.accounts.oauth2.initCodeClient({
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        scope: process.env.REACT_APP_GCAL_SCOPE,
        callback,
      })
    );
  }, []);

  return tokenClient;
}

export { useGoogleAuthentication };
