import { useState, useEffect } from "react";

export const useFetchCommitDetail = (
  owner: string,
  repo: string,
  commitSha: string
) => {
  const [commit, setCommit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitDetail = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch commit details");
        }
        const data = await response.json();
        setCommit(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitDetail();
  }, [owner, repo, commitSha]);

  return { commit, loading, error };
};
