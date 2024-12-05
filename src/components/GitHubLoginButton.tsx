const GitHubLoginButton = () => {
  const handleGitHubLogin = () => {
    window.location.href =
      "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io/auth/github";
  };

  return <button onClick={handleGitHubLogin}>Login with GitHub</button>;
};

export default GitHubLoginButton;
