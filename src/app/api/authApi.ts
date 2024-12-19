import api, { baseURL } from "./index";

export const redirectToGithubLogin = (): string => {
  return (window.location.href = `${baseURL}/api/auth/github`);
};

export const fetchUserProfile = async (): Promise<any> => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};

export const logoutRequest = async (): Promise<any> => {
  const response = await api.get("/api/auth/logout");
  return response.data;
};
