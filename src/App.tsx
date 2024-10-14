import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchUser } from "./store/authSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./layouts/Header";
import LoginPage from "./pages/Login/LoginPage";
import CommitsPage from "./pages/Commits/CommitsPage";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // 로그인 상태를 콘솔에 출력
  useEffect(() => {
    console.log("User is logged in:", isLoggedIn);
  }, [isLoggedIn]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
