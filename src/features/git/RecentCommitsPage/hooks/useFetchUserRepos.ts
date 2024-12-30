import { useQuery } from "@tanstack/react-query";
import { fetchUserRepos } from "../../../../app/api/gitApi";

export const useFetchUserRepos = (username: string, accessToken: string) => {
  return useQuery({
    queryKey: ["userRepos", username],
    queryFn: () => fetchUserRepos(username, accessToken),
    enabled: !!username,
    retry: 1,
  });
};
