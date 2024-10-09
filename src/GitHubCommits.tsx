import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const fetchCommits = async (): Promise<Commit[]> => {
  const { data } = await axios.get<Commit[]>(
    "https://api.github.com/repos/facebook/react/commits"
  );
  return data;
};

const GitHubCommits: React.FC = () => {
  const { data, error, isLoading } = useQuery<Commit[]>({
    queryKey: ["commits"],
    queryFn: fetchCommits,
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error instanceof Error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recent Commits</h2>
      <ul className="space-y-4">
        {data?.map(commit => (
          <li key={commit.sha} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">
              <strong>Message:</strong> {commit.commit.message}
            </p>
            <p className="text-gray-700">
              <strong>Author:</strong> {commit.commit.author.name}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              <strong>Date:</strong>{" "}
              {new Date(commit.commit.author.date).toLocaleString()}
            </p>
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              View Commit
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubCommits;
