import getEnv from "./env";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";

import * as WebBrowser from "expo-web-browser";

const {
  REDIRECT_URI,
  SCOPES,
  CLIENT_ID,
  ALBUM_ID,
  SPOTIFY_API: { DISCOVERY },
} = getEnv();

// needed so that the browser closes the modal after auth token
WebBrowser.maybeCompleteAuthSession();

const useSpotifyAuth = () => {
  const [token, setToken] = useState(null);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI,
    },
    DISCOVERY
  );
  console.log(JSON.stringify(response, null, 2));
  // TODO: Figure out how to set `token` properly!
  React.useEffect(() => {
    if (response?.type === "success") {
      if (response.params && response.params.access_token) {
        setToken(response.params.access_token);
      }
    }
  }, [response]);
  console.log(JSON.stringify(response, null, 2));

  return { token, getSpotifyAuth: promptAsync };
};

export default useSpotifyAuth;
