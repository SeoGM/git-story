import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useFetchUserRepos } from "./hooks/useFetchUserRepos";
import { useFetchTodayCommits } from "./hooks/useFetchTodayCommits";
import CommitsList from "./components/CommitsList";
import RepositoriesList from "./components/RepositoriesList";

function RecentCommitsPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || !user.username) {
    return <p>No user data available</p>;
  }

  const {
    data: repos = [],
    isLoading: reposLoading,
    error: reposError,
    refetch: refetchRepos,
  } = useFetchUserRepos(user.username, user.accessToken);

  const {
    data: commits = [],
    isLoading: commitsLoading,
    error: commitsError,
    refetch: refetchCommits,
  } = useFetchTodayCommits(user.username, user.accessToken, repos);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        GitHub Polling
      </h1>

      <CommitsList
        commits={commits}
        isLoading={commitsLoading}
        error={commitsError}
        refetch={refetchCommits}
      />

      <RepositoriesList
        username={user.username}
        repos={repos}
        isLoading={reposLoading}
        error={reposError}
        refetch={refetchRepos}
      />
    </div>
  );
}

export default RecentCommitsPage;
