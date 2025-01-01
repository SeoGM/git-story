import axios from "axios";

const baseURL = "https://api.github.com";

const api = axios.create({
  baseURL: baseURL,
});

export const fetchUserRepos = async (username: string, accessToken: string) => {
  const response = await api.get(`/users/${username}/repos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const fetchCommits = async (
  username: string,
  repo: string,
  accessToken: string
) => {
  const response = await api.get(`/repos/${username}/${repo}/commits`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const fetchCommitDetail = async (
  username: string,
  repo: string,
  sha: string,
  accessToken: string
) => {
  const response = await api.get(`/repos/${username}/${repo}/commits/${sha}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
