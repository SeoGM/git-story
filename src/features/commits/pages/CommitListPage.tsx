import React from "react";
import { Link } from "react-router-dom";
import { useFetchCommits } from "../hooks/useFetchCommits";
import CommitItem from "../components/CommitItem";

const CommitListPage = () => {
  const { commits, loading, error } = useFetchCommits(
    // "https://api.github.com/repos/{owner}/{repo}/commits"
    "https://api.github.com/repos/SeoGM/git-story/commits"
  );

  if (loading) {
    return <div>Loading commits...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="commit-list">
      {commits &&
        commits.map(commit => (
          <Link to={`/commit/${commit.sha}`} key={commit.sha}>
            <CommitItem commit={commit} />
          </Link>
        ))}
    </div>
  );
};

export default CommitListPage;
