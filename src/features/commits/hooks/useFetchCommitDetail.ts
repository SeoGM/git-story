import { useQuery } from "@tanstack/react-query";

const fetchCommitDetail = async (
  owner: string,
  repo: string,
  commitSha: string
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch commit details");
  }
  return response.json();
};

export const useFetchCommitDetail = (
  owner: string,
  repo: string,
  commitSha: string
) => {
  return useQuery({
    queryKey: ["commitDetail", owner, repo, commitSha],
    queryFn: () => fetchCommitDetail(owner, repo, commitSha),
    enabled: !!owner && !!repo && !!commitSha,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
