import React from "react";

type Repository = {
  id: string;
  name: string;
};

interface RepositoriesListProps {
  repos: Repository[];
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

function RepositoriesList({
  repos,
  isLoading,
  error,
  refetch,
}: RepositoriesListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mt-6">Repositories</h2>
      {isLoading && (
        <p className="text-center text-blue-500">Loading repositories...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error loading repositories: {error.message}
        </p>
      )}
      {repos.length ? (
        <ul className="list-disc pl-6 space-y-2">
          {repos.map(repo => (
            <li key={repo.id} className="text-gray-600">
              {repo.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No repositories found.</p>
      )}
      <button
        onClick={refetch}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 mt-4"
      >
        Refresh Repositories
      </button>
    </div>
  );
}

export default RepositoriesList;
