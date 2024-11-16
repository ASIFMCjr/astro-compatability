import axios from "axios";
import { Api as AuthApi } from "./typed-api/AuthApi";
import { Api as ProfilesApi } from "./typed-api/ProfilesApi";
import { getTokens } from "../model";

export const authApi = new AuthApi({
  baseURL: "http://localhost:8081",
});

export const profilesApi = new ProfilesApi({
  baseURL: "http://localhost:8082",
});
profilesApi.instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token") || "";
    config.headers.Authorization = token && `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
