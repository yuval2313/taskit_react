import { useEffect, useState } from "react";

import { useGlobalGoogle } from "hooks/useGlobalGoogle";

function useGoogleAuthentication(callback) {
  const [tokenClient, setTokenClient] = useState({});
  const google = useGlobalGoogle();

  useEffect(() => {
    if (google)
      setTokenClient(
        google.accounts.oauth2.initCodeClient({
          client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: `${process.env.REACT_APP_GCAL_SCOPE} ${process.env.REACT_APP_USER_SCOPE}`,
          callback,
        })
      );
  }, [google]);

  return tokenClient;
}

export { useGoogleAuthentication };
