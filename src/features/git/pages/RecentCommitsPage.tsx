import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useQuery } from "@tanstack/react-query";
import { fetchTodayLatestCommit } from "../../../app/api/gitApi";

export const RecentCommitsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: commits, isLoading, error } = useQuery({
    queryKey: ["latestCommit", user?.username],
    queryFn: () => fetchTodayLatestCommit(user!.username),
    enabled: !!user,
    retry: 1,
  });

  if (!user) {
    return <p>No user data available</p>;
  }

  if (isLoading) return <p>Loading latest commit...</p>;
  if (error) return <p>Error fetching latest commit: {error.message}</p>;

  return (
    <div>
      <h3>Latest Commit</h3>
      {commits?.length > 0 ? (
        <ul>
          {commits.map((commit: any, index: number) => (
            <li key={index} style={{ marginBottom: '1em' }}>
              <p><strong>Message:</strong> {commit.message}</p>
              <p><strong>Repository:</strong> {commit.repo}</p>
              <p><strong>Date:</strong> {new Date(commit.pushed_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No commits found for today.</p>
      )}
    </div>
  );
};
