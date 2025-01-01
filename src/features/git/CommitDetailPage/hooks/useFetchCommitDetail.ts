import { useQuery } from "@tanstack/react-query";
import { fetchCommitDetail } from "../../api/gitApi";

export const useFetchCommitDetail = (
  username: string,
  repo: string,
  sha: string,
  accessToken: string
) => {
  return useQuery({
    queryKey: ["useCommitDetail", username, repo, sha],
    queryFn: () => fetchCommitDetail(username, repo, sha, accessToken),
    enabled: !!username && !!repo && !!sha && !!accessToken,
  });
};
