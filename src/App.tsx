import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchUser } from "./store/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import LoginPage from "./pages/Login/LoginPage";
import CommitsPage from "./pages/Commits/CommitsPage";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <CommitsPage /> : <LoginPage />}
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
