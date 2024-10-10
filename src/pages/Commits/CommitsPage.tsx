import React from "react";
import GitHubCommits from "../../components/GitHubCommits";

const CommitsPage = () => {
  return (
    <div className="p-4">
      <h2>GitHub Commits</h2>
      <GitHubCommits />
    </div>
  );
};

export default CommitsPage;
