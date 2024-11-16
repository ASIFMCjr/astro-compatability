import { Api as CosmoApi } from "./typed-api/Cosmogram";

export const cosmogramApi = new CosmoApi({
  baseURL: "http://localhost:8000",
});

// cosmogramApi.instance.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("access_token") || "";
//     config.headers.Authorization = token && `Bearer ${token}`;
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
