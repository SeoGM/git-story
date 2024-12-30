import axios, { AxiosResponse } from "axios";
import { UserProfile } from "../types";

const baseURL =
  process.env.REACT_APP_APP_ENV === "vercel"
    ? "https://git-story-rouge.vercel.app"
    : "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const redirectToGithubLogin = (): string => {
  return (window.location.href = `${baseURL}/api/auth/github`);
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};

export const logoutRequest = async (): Promise<AxiosResponse<any, any>> => {
  const response = await api.get("/api/auth/logout");
  return response;
};
