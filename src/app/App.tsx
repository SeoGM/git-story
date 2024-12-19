import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import PublicPage from "../features/public/pages/PublicPage";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./api/authApi";
import { login } from "../features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await fetchUserProfile();
        if (user) {
          dispatch(login(user));
        }
      } catch (error) {}
    };
    initializeAuth();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PublicPage />} />
      </Routes>
    </Router>
  );
};

export default App;
