import React from 'react';
import './App.css';
import GitHubCommits from './GitHubCommits';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>GitHub Commits Viewer</h1>
      <GitHubCommits />
    </div>
  );
};

export default App;
