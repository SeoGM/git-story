import { useQuery } from "@tanstack/react-query";
import { Commit } from "../types";

const fetchCommits = async (repoUrl: string): Promise<Commit[]> => {
  const response = await fetch(repoUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch commits");
  }
  return response.json();
};

export const useFetchCommits = (repoUrl: string) => {
  const {
    data: commits,
    isLoading,
    error,
  } = useQuery<Commit[], Error>({
    queryFn: () => fetchCommits(repoUrl),
    queryKey: [repoUrl],
    retry: 1,
  });

  return { commits, isLoading, error: error?.message || null };
};
