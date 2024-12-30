import { useQuery } from "@tanstack/react-query";
import { fetchCommits } from "../../../../app/api/gitApi";

export const useFetchTodayCommits = (
  username: string,
  accessToken: string,
  repos: any[]
) => {
  const today = new Date().toISOString().split("T")[0];

  return useQuery({
    queryKey: ["todayCommits", username],
    queryFn: async () => {
      if (!repos.length) return [];
      const allCommits = await Promise.all(
        repos.map(repo =>
          fetchCommits(username, repo.name, accessToken).then(data =>
            data
              .filter((commit: any) =>
                commit.commit.author.date.startsWith(today)
              )
              .map((commit: any) => ({
                ...commit,
                repoName: repo.name,
              }))
          )
        )
      );
      return allCommits.flat();
    },
    enabled: !!repos.length,
    retry: 1,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};
