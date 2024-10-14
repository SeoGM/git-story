import GitHubLoginButton from "../components/GitHubLoginButton";
import UserStatus from "../components/UserStatus";

const Header = () => {
  const isLoggedIn = !!sessionStorage.getItem("access_token"); // 로그인 여부 확인

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      <nav>{isLoggedIn ? <UserStatus /> : <GitHubLoginButton />}</nav>
    </header>
  );
};

export default Header;
