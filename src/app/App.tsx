import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/auth/api/authApi";
import { login, logout } from "../features/auth/authSlice";

import { RootState } from "./store";
import Header from "./layouts/Header";
import PublicPage from "../features/public/PublicPage";
import RecentCommitsPage from "../features/git/RecentCommitsPage";
import RepoCommitsPage from "../features/git/RepoCommitsPage";

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
        <Route
          path="/:username/:repoName/commits"
          element={<RepoCommitsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
