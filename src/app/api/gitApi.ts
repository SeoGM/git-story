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
  owner: string,
  repo: string,
  accessToken: string
) => {
  const response = await api.get(`/repos/${owner}/${repo}/commits`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const fetchCommitDetails = async (
  owner: string,
  repo: string,
  sha: string,
  accessToken: string
) => {
  const response = await api.get(`/repos/${owner}/${repo}/commits/${sha}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
