const GitHubLoginButton = () => {
  const handleGitHubLogin = () => {
    const loginURL =
      process.env.APP_ENV === "vercel"
        ? "https://git-story-rouge.vercel.app/auth/github"
        : "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io/auth/github";

    window.location.href = loginURL;
  };

  return <button onClick={handleGitHubLogin}>Login with GitHub</button>;
};

export default GitHubLoginButton;
