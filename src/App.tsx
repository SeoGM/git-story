import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./layouts/Header";
import LoginPage from "./pages/Login/LoginPage";
import CommitsPage from "./pages/Commits/CommitsPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 함수
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io/profile",
        {
          withCredentials: true, // 쿠키 포함
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("인증 오류:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/commits"
          element={isLoggedIn ? <CommitsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
