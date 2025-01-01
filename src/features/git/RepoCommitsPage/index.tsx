import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCommits } from "./hooks/useFetchCommit";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { groupByDate } from "../../../utils/groupByDate";

const RepoCommitsPage = () => {
  const { username, repo } = useParams();
  const accessToken = useSelector(
    (state: RootState) => state.auth.user?.accessToken
  );
  const navigate = useNavigate();

  const {
    data: commits = [],
    isLoading,
    error,
  } = useFetchCommits(username!, repo!, accessToken!);

  const groupedCommits = groupByDate(commits);

  const handleShaClick = (sha: string) => {
    navigate(`/${username}/${repo}/commit/${sha}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Commits for {repo}
      </h1>
      {isLoading && (
        <p className="text-center text-blue-500">Loading commits...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error loading commits: {error.message}
        </p>
      )}
      {Object.keys(groupedCommits).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedCommits).map(([date, dateCommits]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {date}
              </h2>
              <ul className="space-y-4">
                {dateCommits.map(commit => (
                  <li
                    key={commit.sha}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <p>
                      <span className="font-bold text-gray-700">Message:</span>{" "}
                      {commit.commit.message}
                    </p>
                    <p>
                      <span className="font-bold text-gray-700">SHA:</span>{" "}
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => handleShaClick(commit.sha)}
                      >
                        {commit.sha}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No commits found for this repository.</p>
      )}
    </div>
  );
};

export default RepoCommitsPage;
