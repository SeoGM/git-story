import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchUser } from "./store/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import { HomePage } from "./features/home";
import { CommitListPage, CommitDetailPage } from "./features/commits";

const App = () => {
  console.log("process.env.APP_ENV", process.env.REACT_APP_APP_ENV);
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
          element={isLoggedIn ? <CommitListPage /> : <HomePage />}
        />
        <Route path="/commit/:commitHash" element={<CommitDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
