import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../../features/auth/authSlice";
import { redirectToGithubLogin, logoutRequest } from "../api/authApi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async () => {
    try {
      const response = await logoutRequest();
      console.log("Logout response:", response); // 응답 확인
      dispatch(logout()); // Redux 상태 초기화
      navigate("/"); // 홈 화면으로 리디렉션
    } catch (error) {
      console.error("Logout failed:", error); // 오류 메시지 출력
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      <nav>
        {isAuthenticated && user ? (
          <>
            <div className="flex items-center space-x-2">
              <img
                src={user.avatar}
                alt={`${user.name} avatar`}
                className="w-8 h-8 rounded-full"
              />
              <p>{user.name}</p>
              <button
                onClick={() => handleLogout()}
                className="btn btn-primary ml-4"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => redirectToGithubLogin()}>
            Login with GitHub
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
