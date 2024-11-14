export const BASE_URL = "http://152.42.240.131/api/v1";
import { useCookie } from "#app";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export const getAuthHeaders = () => {
  // Use `useCookie` inside this function
  const cookieToken = useCookie("token");

  if (cookieToken && cookieToken.value) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${cookieToken.value}`,
    };
  }

  return defaultHeaders;
};
 