import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function getCsrfToken() {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  return csrfCookie ? decodeURIComponent(csrfCookie.split("=")[1]) : undefined;
}

export default AxiosInstance;
