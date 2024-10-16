import { useDispatch, useSelector } from "react-redux";
import GitHubLoginButton from "../components/GitHubLoginButton";
import UserStatus from "../components/UserStatus";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <p>{user.username}</p>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </>
        ) : (
          <GitHubLoginButton />
        )}
      </nav>
    </header>
  );
};

export default Header;
