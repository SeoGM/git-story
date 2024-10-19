import { useDispatch, useSelector } from "react-redux";
import GitHubLoginButton from "../components/GitHubLoginButton";
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
            <div className="flex items-center space-x-2">
              <img
                src={user.avatar_url}
                alt={`${user.username} avatar`}
                className="w-8 h-8 rounded-full"
              />
              <p>{user.username}</p>
              <button onClick={handleLogout} className="btn btn-primary ml-4">
                Logout
              </button>
            </div>
          </>
        ) : (
          <GitHubLoginButton />
        )}
      </nav>
    </header>
  );
};

export default Header;
