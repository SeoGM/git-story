// GitHubLoginButton.jsx (또는 .tsx)
import React from "react";

const GitHubLoginButton = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

  const redirectUri = `${window.location.origin}/callback`;

  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
    console.log("Redirecting to GitHub OAuth URL:", githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  return <button onClick={handleLogin}>Login with GitHub</button>;
};

export default GitHubLoginButton;
