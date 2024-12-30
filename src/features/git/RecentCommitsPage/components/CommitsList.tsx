import React from "react";

type Commit = {
  sha: string;
  repoName: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

interface CommitsListProps {
  commits: Commit[];
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

function CommitsList({ commits, isLoading, error, refetch }: CommitsListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mt-6">
        Today Commits
      </h2>
      {isLoading && (
        <p className="text-center text-blue-500">Loading commits...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error loading commits: {error.message}
        </p>
      )}
      {commits.length ? (
        <ul className="space-y-4 mt-4">
          {commits.map((commit, index) => (
            <li
              key={commit.sha || index}
              className="border border-gray-300 rounded-lg p-4"
            >
              <p>
                <span className="font-bold text-gray-700">Repository:</span>{" "}
                {commit.repoName}
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
        <p className="text-gray-500 mt-4">No commits found for today.</p>
      )}
      <button
        onClick={refetch}
        disabled={isLoading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 mt-6"
      >
        Check Today Commits
      </button>
    </div>
  );
}

export default CommitsList;
