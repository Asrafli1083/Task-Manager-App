// interceptor: will intercept any request that we send and automatically add the correct header
// axios: clean way to send network request that easy to use
// axios interceptor: anytime we send a request,its going to check if we have access token
// and will automatically added request

import axios from "axios";
import { ACCESS_TOKEN } from "./constant";

// gak tau tapi coba kasih ini untuk solve problem waktu register error
// const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";
//
const api = axios.create({
  // below is to import anything that's specified inside an env variable file
  // we start with "VITE" to load env variable inside react
  // in a simple way, we can use env variable to change what the URL should be
  // how it works: import env VITE and specify that as base URL
  baseURL: import.meta.env.VITE_API_URL, //? import.meta.env.VITE_API_URL : apiUrl,
  // tambahan dari copilot untuk atasi error ||| mungkin axios 500
  headers: {
    "Content-Type": "application/json",
  },
});

// look in local storage and check for the access token, if we have access token we can add
// that as authorize header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // if we do have the token, we will pass the authorization to the header using bearer
    if (token) {
      // we use ``backticks to embed string and string
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// using API's object
export default api;
