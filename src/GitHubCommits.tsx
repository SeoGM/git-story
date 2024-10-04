import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 인터페이스 정의
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

const GitHubCommits: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/facebook/react/commits'
        );
        setCommits(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch commits');
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recent Commits</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            <p><strong>Message:</strong> {commit.commit.message}</p>
            <p><strong>Author:</strong> {commit.commit.author.name}</p>
            <p><strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}</p>
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer">View Commit</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubCommits;
