import { useEffect, useState } from "react";
import GitHubLoginButton from "../components/GitHubLoginButton";
import UserStatus from "../components/UserStatus";

type ServerData = {
  message: string;
};

const Header = () => {
  const isLoggedIn = !!sessionStorage.getItem("access_token"); // 로그인 여부 확인

  const [data, setData] = useState<ServerData | null>(null);

  useEffect(() => {
    fetch(
      "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io/api/data",
      {
        method: "GET",
        credentials: "include", // CORS 문제 해결을 위해 credentials 옵션 추가
      }
    )
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      <nav>{isLoggedIn ? <UserStatus /> : <GitHubLoginButton />}</nav>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </header>
  );
};

export default Header;
