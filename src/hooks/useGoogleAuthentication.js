import { useEffect, useState } from "react";
import config from "config/config.json";

function useGoogleAuthentication(callback) {
  const [tokenClient, setTokenClient] = useState({});

  useEffect(() => {
    /* global google */
    setTokenClient(
      google.accounts.oauth2.initCodeClient({
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        scope: `${config.GOOGLE_API_SCOPES.GCAL} ${config.GOOGLE_API_SCOPES.USER}`,
        callback: async (code) => {
          if (
            !code.error &&
            code.scope.match(new RegExp(config.GOOGLE_API_SCOPES.GCAL))
          )
            return await callback(code);
        },
      })
    );
  }, []);

  return tokenClient;
}

export { useGoogleAuthentication };
