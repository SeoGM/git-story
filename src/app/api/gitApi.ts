import axios from "axios";

const baseURL = "https://api.github.com";

const api = axios.create({
  baseURL: baseURL,
});

export const fetchUserEvents = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}/events`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching user events:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchTodayLatestCommit = async (username: string) => {
  try {
    const events = await fetchUserEvents(username);

    const today = new Date().toISOString().split("T")[0];

    const pushEvents = events.filter(
      (event: any) => event.type === "PushEvent"
    );
    const todayCommits = pushEvents
      .flatMap((event: any) => {
        return event.payload.commits.map((commit: any) => ({
          ...commit,
          repo: event.repo.name,
          pushed_at: event.created_at,
        }));
      })
      .filter((commit: any) => commit.pushed_at.startsWith(today));

    const latestCommit = todayCommits.sort(
      (a: any, b: any) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )[0];

    return latestCommit || null;
  } catch (error: any) {
    console.error(
      "Error fetching latest commit:",
      error.response?.data || error.message
    );
    throw error;
  }
};
