import { useQuery } from "@tanstack/react-query";
import { fetchUserRepos } from "../../api/gitApi";

export const useFetchUserRepos = (username: string, accessToken: string) => {
  return useQuery({
    queryKey: ["userRepos", username],
    queryFn: () => fetchUserRepos(username, accessToken),
    enabled: !!username && !!accessToken,
    retry: 1,
  });
};
