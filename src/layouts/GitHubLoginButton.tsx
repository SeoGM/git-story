const GitHubLoginButton = () => {
  const handleGitHubLogin = () => {
    const loginURL =
      process.env.REACT_APP_APP_ENV === "vercel"
        ? "https://git-story-rouge.vercel.app/api/auth/github"
        : "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io/api/auth/github";

    window.location.href = loginURL;
  };

  return <button onClick={handleGitHubLogin}>Login with GitHub</button>;
};

export default GitHubLoginButton;
