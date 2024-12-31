import { useQuery } from "@tanstack/react-query";
import { fetchCommits } from "../../api/gitApi";

export const useFetchCommits = (
  username: string,
  repo: string,
  accessToken: string
) => {
  return useQuery({
    queryKey: ["useCommits", username, repo],
    queryFn: () => fetchCommits(username, repo, accessToken),
    enabled: !!username && !!repo && !!accessToken,
  });
};
