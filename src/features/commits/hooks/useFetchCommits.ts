import { useState, useEffect } from "react";
import { Commit } from "../types";

export const useFetchCommits = (repoUrl: string) => {
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(repoUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch commits");
        }
        const data = await response.json();
        setCommits(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [repoUrl]);

  return { commits, loading, error };
};
