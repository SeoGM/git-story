import axios from "axios";

export const baseURL =
  process.env.REACT_APP_APP_ENV === "vercel"
    ? "https://git-story-rouge.vercel.app"
    : "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
