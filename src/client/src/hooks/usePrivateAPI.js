import { useEffect } from "react";
import { useSelector } from "react-redux";
import { privateAxios } from "../api/axios";
import useRefreshToken from "./useRefreshToken";

export default function usePrivateAPI() {
  const refresh = useRefreshToken();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseInterceptor = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
      }
    );
    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.request.eject(responseInterceptor);
    };
  }, [auth.accessToken, refresh]);
  return privateAxios;
}
