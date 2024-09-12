// represent a wrapper for a protected route
// to filter an authorized user only to see the route
// if the user don't have authorization, it will redirect the user to relogin

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant";
import { useState, useEffect } from "react";

// children is the one that will be wrapped
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    // if there is an error, we set the authorization to false
    auth().catch(() => setIsAuthorized(false));
  }, []);
  // the idea of these funcs
  // 1. Look at access token and check if its expired or Not
  // 2. If its expired, then the token will be refreshed automatically
  // 3. If the user cannot refresh the token, it will ask the user to relogin
  // refresh access token automatically
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      // send a request to backend with refresh_token to get new access_token
      // pass refresh to refreshToken
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      // if we get the refresh token/success
      if (res.status === 200) {
        // go to local storage to get the access token and set it to res.data.access
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        // then set the authorization to be true
        setIsAuthorized(true);
        // if not authorized
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };
  // check authorization by refreshing the token or get the authorization
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    // if we have the token, we can decode that and get the exp date
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // to convert from ms to s, we need to divide it by 1000

    // if the token expired
    if (tokenExpiration < now) {
      await refreshToken();
      // if the token is not expired/OK
    } else {
      setIsAuthorized(true);
    }
  };
  // it will show "Loading..." until the useState is not null by checking 2 funcs above
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  // if we have authorization, we can pass the children and navigate it to login page
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
