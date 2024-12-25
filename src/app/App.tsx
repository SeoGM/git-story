import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./api/authApi";
import { login, logout } from "../features/auth/authSlice";

import Header from "./layouts/Header";
import PublicPage from "../features/public/pages/PublicPage";
import { RootState } from "./store";
import { RecentCommitsPage } from "../features/git/pages/RecentCommitsPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await fetchUserProfile();
        if (user) {
          dispatch(login(user));
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    initializeAuth();
  }, [dispatch]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <RecentCommitsPage /> : <PublicPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
