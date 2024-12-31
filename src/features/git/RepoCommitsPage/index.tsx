import React from "react";
import { useParams } from "react-router-dom";
import { useFetchCommits } from "./hooks/useFetchCommit";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const RepoCommitsPage = () => {
  const accessToken = useSelector(
    (state: RootState) => state.auth.user?.accessToken
  );
  const { username, repoName } = useParams();

  const {
    data: commits = [],
    isLoading,
    error,
  } = useFetchCommits(username!, repoName!, accessToken!);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Commits for {repoName}
      </h1>
      {isLoading && (
        <p className="text-center text-blue-500">Loading commits...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error loading commits: {error.message}
        </p>
      )}
      {commits.length ? (
        <ul className="space-y-4">
          {commits.map((commit: any, index: number) => (
            <li
              key={commit.sha || index}
              className="border border-gray-300 rounded-lg p-4"
            >
              <p>
                <span className="font-bold text-gray-700">SHA:</span>{" "}
                {commit.sha}
              </p>
              <p>
                <span className="font-bold text-gray-700">Message:</span>{" "}
                {commit.commit.message}
              </p>
              <p>
                <span className="font-bold text-gray-700">Date:</span>{" "}
                {commit.commit.author.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No commits found for this repository.</p>
      )}
    </div>
  );
};

export default RepoCommitsPage;
