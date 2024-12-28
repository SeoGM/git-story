import axios from "axios";

const baseURL = "https://api.github.com";

const api = axios.create({
  baseURL: baseURL,
});

export const fetchUserRepos = async (username: string) => {
  const response = await api.get(`/users/${username}/repos`);
  return response.data;
};

export const fetchCommits = async (owner: string, repo: string) => {
  const response = await api.get(`/repos/${owner}/${repo}/commits`);
  return response.data;
};

export const fetchCommitDetails = async (
  owner: string,
  repo: string,
  sha: string
) => {
  const response = await api.get(`/repos/${owner}/${repo}/commits/${sha}`);
  return response.data;
};
