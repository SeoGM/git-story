import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useQuery } from "@tanstack/react-query";
import { fetchTodayLatestCommit } from "../../../app/api/gitApi";

export const RecentCommitsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data, isLoading, error } = useQuery({
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
      <h3>Today&apos;s Latest Commit</h3>
      {data ? (
        <div>
          <p>
            <strong>Message:</strong> {data.message}
          </p>
          <p>
            <strong>Repository:</strong> {data.repo}
          </p>
          <p>
            <strong>Date:</strong> {new Date(data.date).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No commits found for today.</p>
      )}
    </div>
  );
};
